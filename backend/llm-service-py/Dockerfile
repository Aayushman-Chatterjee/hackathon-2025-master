# ===== Stage 1: Build dependencies in a lightweight Python environment =====
FROM python:3.11-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for pip and building wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy only requirements file first (leveraging Docker caching)
COPY requirements.txt ./

# Install dependencies in a virtual environment
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --user -r requirements.txt

# ===== Stage 2: Build the final image with only required files =====
FROM python:3.11-slim AS runner

# Set environment variables to optimize performance
ENV PYTHONUNBUFFERED=True \
    PYTHONFAULTHANDLER=True \
    PYTHONDONTWRITEBYTECODE=True \
    PIP_NO_CACHE_DIR=True

# Set working directory
WORKDIR /app

# Copy installed dependencies from the builder stage
COPY --from=builder /root/.local /root/.local

# Ensure the installed packages are available in PATH
ENV PATH="/root/.local/bin:$PATH"

# Copy the FastAPI app
COPY . .

# Expose the FastAPI port
EXPOSE 8080

# Start FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
