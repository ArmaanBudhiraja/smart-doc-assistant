from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ingest import ingest_pdf
from rag import answer_question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    question: str

@app.get("/")
def root():
    return {"status": "backend working"}

@app.post("/upload")
async def upload_pdf(file: UploadFile):
    chars = ingest_pdf(file)  
    return {"status": "indexed", "chars": chars}

@app.post("/ask")
async def ask(req: AskRequest):
    return answer_question(req.question)
