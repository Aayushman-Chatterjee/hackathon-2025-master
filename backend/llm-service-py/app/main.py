import logging
import json
import os
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import storage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import requests
from app.models.financial import FinancialProfile
from app.services.prompt_service import PromptService
from app.services.analysis_service import FinancialAnalysisService

load_dotenv()

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Financial Profile Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.environ["OPENAI_API_KEY"] = "EMPTY"
os.environ["OPENAI_API_BASE"] = f"{os.environ['BODHI_LLM_GATEWAY_BASE_URL']}/api/openai"

llm = ChatOpenAI(
    model="gpt-4o",
    # api_key=os.environ["OPENAI_API_KEY"],
    default_headers={"Authorization": os.environ["BODHI_LLM_GATEWAY_TOKEN"]},
)
prompt_service = PromptService()
analysis_service = FinancialAnalysisService(llm, prompt_service)

# Google Cloud Storage Setup
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")  # Set this in .env file
storage_client = storage.Client()
bucket = storage_client.bucket(GCS_BUCKET_NAME)

# Store processing status in memory (use Redis or DB for production)
processing_status = {}


def save_to_gcs(user_id: str, data: dict, file_path: str):
    """Saves analysis results as a JSON file in Google Cloud Storage."""
    blob = bucket.blob(file_path)
    blob.upload_from_string(json.dumps(data, indent=4), content_type="application/json")
    logging.info(f"Saved analysis result for {user_id} to GCS.")


def update_status_in_db(user_id: str, data: dict):
    """Updates the processing status in a database."""
    BE_BASE_URL = os.getenv("BE_BASE_URL")

    response = requests.post(
        f"{BE_BASE_URL}/api/jobs/{user_id}",
        json=data,
    )

    return response.json()


async def process_analysis(user_id: str, profile: FinancialProfile):
    """Performs the financial analysis and saves the result to GCS."""
    try:
        result = await analysis_service.analyze_profile(profile)

        gcs_file_path = f"results/users/{user_id}.json"

        # Update processing status
        processing_status[user_id] = {
            "status": "processed",
            "progress": "100%",
            "result_path": f"gs://{GCS_BUCKET_NAME}/{gcs_file_path}",
        }

        # Save result to GCS
        save_to_gcs(user_id, result, gcs_file_path)

        # Update status in database
        update_status_in_db(user_id, processing_status[user_id])
    except Exception as e:
        logging.error(f"Error processing user {user_id}: {e}")
        processing_status[user_id] = {
            "status": "failed",
            "progress": "0%",
            "error": str(e),
        }


@app.post("/analyze")
async def analyze_profile(background_tasks: BackgroundTasks, profile: FinancialProfile):
    """Initiates analysis in the background and immediately returns a processing response."""
    user_id = str(profile.user_id)  # Ensure user_id is a string

    # Set initial processing status
    processing_status[user_id] = {
        "status": "processing",
        "progress": "0%",
        "result_path": "",
    }

    # Start background task
    background_tasks.add_task(process_analysis, user_id, profile)

    return {
        "user_id": user_id,
        "status": "processing",
        "progress": "0%",
        "result_path": "",
    }


@app.get("/results/{user_id}")
async def get_analysis_result(user_id: str):
    """Fetches the processing status or result for a given user."""
    if user_id in processing_status:
        return processing_status[user_id]

    return {"error": "User ID not found or analysis not started."}
