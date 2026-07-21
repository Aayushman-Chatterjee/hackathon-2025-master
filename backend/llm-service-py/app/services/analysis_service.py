import json
import logging
from langchain_openai import ChatOpenAI
from ..models.financial import (
    FinancialProfile,
    FinancialAnalysisResponse,
    ClassificationResponse,
    Group1Response,
    Group2Response,
    Group3Response,
)
from .prompt_service import PromptService
from asyncio import sleep


class FinancialAnalysisService:
    def __init__(self, llm: ChatOpenAI, prompt_service: PromptService):
        self.llm = llm
        self.prompt_service = prompt_service

    async def classify_profile(
        self, profile: FinancialProfile
    ) -> ClassificationResponse:
        try:
            prompt = self.prompt_service.get_prompt("classification")
            llm_chain = prompt | self.llm
            response = await llm_chain.ainvoke(
                prompt.format_messages(financial_data=json.dumps(profile.model_dump()))
            )
            result = json.loads(
                response.content.replace("```json\n", "").replace("```", "")
            )
            logging.info(result)
            # return response.content
            return result
        except Exception as e:
            logging.info(e)
            return {"error": str(e)}

    async def analyze_group1(self, profile: FinancialProfile) -> Group1Response:
        try:
            prompt = self.prompt_service.get_prompt("group1_analysis")
            llm_chain = prompt | self.llm
            response = await llm_chain.ainvoke(
                prompt.format_messages(financial_data=json.dumps(profile.model_dump()))
            )
            result = json.loads(
                response.content.replace("```json\n", "").replace("```", "")
            )
            logging.info(result)
            # return response.content
            return result
        except Exception as e:
            logging.info(e)
            return {"error": str(e)}

    async def analyze_group2(self, profile: FinancialProfile) -> Group2Response:
        try:
            prompt = self.prompt_service.get_prompt("group2_analysis")
            llm_chain = prompt | self.llm
            response = await llm_chain.ainvoke(
                prompt.format_messages(financial_data=json.dumps(profile.model_dump()))
            )
            result = json.loads(
                response.content.replace("```json\n", "").replace("```", "")
            )
            logging.info(result)
            # return response.content
            return result
        except Exception as e:
            logging.info(e)
            return {"error": str(e)}

    async def analyze_group3(self, profile: FinancialProfile) -> Group3Response:
        try:
            prompt = self.prompt_service.get_prompt("group3_analysis")
            llm_chain = prompt | self.llm
            response = await llm_chain.ainvoke(
                prompt.format_messages(financial_data=json.dumps(profile.model_dump()))
            )
            result = json.loads(
                response.content.replace("```json\n", "").replace("```", "")
            )
            logging.info(result)
            # return response.content
            return result
        except Exception as e:
            logging.info(e)
            return {"error": str(e)}

    async def analyze_profile(
        self, profile: FinancialProfile
    ) -> FinancialAnalysisResponse:
        try:
            logging.info("Starting classification")
            classification = await self.classify_profile(profile)
            logging.info("Sleeping for 3 seconds")
            await sleep(3)
            logging.info("Starting group 1 analysis")
            group1_insights = await self.analyze_group1(profile)
            await sleep(3)
            logging.info("Starting group 2 analysis")
            group2_insights = await self.analyze_group2(profile)
            await sleep(3)
            logging.info("Starting group 3 analysis")
            group3_insights = await self.analyze_group3(profile)
            await sleep(3)

            return {
                "classification": classification,
                "group1_insights": group1_insights,
                "group2_insights": group2_insights,
                "group3_insights": group3_insights,
            }
        except Exception as e:
            logging.info(e)
            return {"error": str(e)}
