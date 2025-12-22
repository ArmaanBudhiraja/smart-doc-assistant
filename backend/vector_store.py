import faiss
import numpy as np

DIMENSION = 384
index = faiss.IndexFlatL2(DIMENSION)

documents = []

def add(chunks, embeddings):
    vectors = np.array(embeddings).astype("float32")
    index.add(vectors)

    for chunk in chunks:
        documents.append(chunk)

def search(query_embedding, k=4):
    q = np.array([query_embedding]).astype("float32")
    distances, indices = index.search(q, k)

    results = []
    for i in indices[0]:
        if i < len(documents):
            results.append(documents[i])

    return results
