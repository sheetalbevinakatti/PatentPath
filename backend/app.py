import os
from pathlib import Path

import chromadb
import mysql.connector
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

load_dotenv(Path(__file__).resolve().parent / ".env")


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="PatentPath API",
    description="API for Invention-to-Patent Traceability and Prior-Art Analysis",
    version="1.0.0"
)


# --------------------------------------------------
# CORS Configuration
# Allows the Next.js frontend to communicate
# with the FastAPI backend
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# MySQL Connection
# --------------------------------------------------

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


# --------------------------------------------------
# ChromaDB Connection
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

CHROMA_PATH = BASE_DIR.parent / "vector_db" / "chroma_data"

chroma_client = chromadb.PersistentClient(
    path=str(CHROMA_PATH)
)

prior_art_collection = chroma_client.get_collection(
    name="prior_art"
)


# --------------------------------------------------
# Request Model
# --------------------------------------------------

class PriorArtSearchRequest(BaseModel):
    query: str
    n_results: int = 3


# --------------------------------------------------
# Home Endpoint
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "PatentPath API is running"
    }


# --------------------------------------------------
# Health Check Endpoint
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# Get Inventions from MySQL
# --------------------------------------------------

@app.get("/inventions")
def get_inventions():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            Invention_ID,
            Title,
            Description,
            Creation_Date,
            Status,
            Technology_ID
        FROM INVENTION
        ORDER BY Invention_ID
    """)

    inventions = cursor.fetchall()

    cursor.close()
    connection.close()

    return {
        "count": len(inventions),
        "inventions": inventions
    }


# --------------------------------------------------
# Prior-Art Semantic Search using ChromaDB
# --------------------------------------------------

@app.post("/prior-art/search")
def search_prior_art(request: PriorArtSearchRequest):

    results = prior_art_collection.query(
        query_texts=[request.query],
        n_results=request.n_results
    )

    documents = results["documents"][0]
    ids = results["ids"][0]
    distances = results["distances"][0]
    metadatas = results["metadatas"][0]

    matches = []

    for i in range(len(documents)):

        matches.append({
            "id": ids[i],
            "document": documents[i].strip(),
            "distance": distances[i],
            "metadata": metadatas[i]
        })

    return {
        "query": request.query,
        "results": matches
    }