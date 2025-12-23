import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from ingest import ingest_pdf
from rag import answer_question

# Load environment variables
load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    question: str

@app.get("/")
def root():
    return {"status": "backend working"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    chars = ingest_pdf(file)
    return {
        "status": "indexed",
        "chars": chars,
        "filename": file.filename,
    }

@app.post("/ask")
async def ask(req: AskRequest):
    return answer_question(req.question)
