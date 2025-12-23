const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function uploadPDF(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload PDF");
  }

  return res.json();
}

export async function askQuestion(question: string) {
  const res = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  return res.json();
}
