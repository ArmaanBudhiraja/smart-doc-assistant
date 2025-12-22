import fitz
from embeddings import embed
from vector_store import add

def chunk_text(text, chunk_size=500, overlap=100):
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks

def ingest_pdf(file):
    doc = fitz.open(stream=file.file.read(), filetype="pdf")

    chunks = []

    for page in doc:
        page_text = page.get_text().strip()
        if not page_text:
            continue

        page_chunks = chunk_text(page_text)

        for c in page_chunks:
            chunks.append({
                "text": c,
                "page": page.number + 1
            })

    texts = [c["text"] for c in chunks]
    embeddings = embed(texts)

    add(chunks, embeddings)
    total_chars = sum(len(c["text"]) for c in chunks)
    add(chunks, embeddings)
    return total_chars
