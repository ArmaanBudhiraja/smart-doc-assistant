# 📄 ThinkPDF 
### Chat with your documents. Instantly.

ThinkPDF is an AI-powered **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDF documents and ask natural language questions about them. The system generates accurate, context-aware answers grounded strictly in the content of the uploaded document.

The application is built using a **local LLM (LLaMA 3 8B)**, ensuring privacy, offline capability, and full control over data — with no reliance on external AI APIs.

---

## ✨ Features

- 📤 **PDF Upload & Text Extraction**  
  Upload text-based PDF files and automatically extract their content.

- 🧠 **Context-Aware Question Answering (RAG)**  
  Answers are generated using only the retrieved document context, reducing hallucinations.

- 🔍 **Source Grounding**  
  Each answer is backed by relevant chunks from the original document.

- 💬 **ChatGPT-style Conversational UI**  
  Multi-turn chat interface with preserved conversation history.

- 🧩 **Local LLM (LLaMA 3 8B)**  
  Runs entirely on local infrastructure — no OpenAI or cloud dependency.

- 🎨 **Modern Two-Column UI**  
  Clean interface with document metadata on the left and chat on the right.

---

## 🏗️ System Architecture

Frontend (Next.js)
│
├── PDF Upload
├── Chat UI
│
└── API Calls
      ↓
Backend (FastAPI)
│
├── PDF Ingestion
├── Text Chunking
├── Embeddings (Sentence Transformers)
├── Vector Store (FAISS)
└── LLaMA 3 (Answer Generation)

---

## 🧠 Tech Stack

### Frontend
- Next.js (App Router)
- React + TypeScript
- Custom CSS
- Lucide Icons

### Backend
- FastAPI
- SentenceTransformers
- FAISS (Vector Database)
- LLaMA 3 8B (Local Inference)

### ML / NLP
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Embedding-based Similarity Matching

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ArmaanBudhiraja/smart-doc-assistant.git
cd smart-doc-assistant
```

### 2️⃣To download and run Llama3 8B 
```bash
brew install ollama
brew services start ollama 
ollama pull llama3:8b
```

### 3️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
```


uvicorn main:app --reload
