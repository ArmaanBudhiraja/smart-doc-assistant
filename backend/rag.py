from embeddings import embed
from vector_store import search
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3:8b"

def build_prompt(context, question):
    return f"""
You are a document question-answering assistant.

Answer the question using ONLY the context below.
If the answer is not present, say exactly:
"Not found in the document."

Context:
{context}

Question:
{question}
"""

def answer_question(question):
    query_embedding = embed([question])[0]
    chunks = search(query_embedding)

    context = ""
    for c in chunks:
        context += f"[Page {c['page']}]\n{c['text']}\n\n"

    prompt = build_prompt(context, question)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    answer = response.json()["response"]

    seen = set()
    sources = []

    for c in chunks:
        key = (c["page"], c["text"][:150])
        if key not in seen:
            seen.add(key)
            sources.append({
                "page": c["page"],
                "excerpt": c["text"][:200]
            })

    return {
        "answer": answer.strip(),
        "sources": sources
    }
