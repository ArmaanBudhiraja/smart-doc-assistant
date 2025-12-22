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
### Start the backend server:
```bash
uvicorn main:app --reload
```
### Backend will be available at: 
```bash
http://127.0.0.1:8000
```

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Frontend will be available at:
```bash
http://localhost:3000
```

---

## 🧪 How It Works (RAG Flow)
1. User uploads a PDF

2. Text is extracted and chunked

3. Chunks are converted into embeddings

4. Embeddings are stored in FAISS

5. User asks a question

6. Relevant chunks are retrieved via semantic search

7. LLaMA 3 generates an answer using retrieved context

8. Answer and sources are returned to the UI

---

### 🔐 Privacy & Security

- No external API calls

- No document data stored permanently

- Fully local inference

- Suitable for sensitive documents

---

### 👨‍💻 Author

Armaan Budhiraja
B.Tech Computer Science & Engineering
Vellore Institute of Technology, Vellore

GitHub: https://github.com/ArmaanBudhiraja

LinkedIn: https://linkedin.com/in/armaanbudhiraja