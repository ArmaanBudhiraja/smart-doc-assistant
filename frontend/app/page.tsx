"use client";

import { useRouter } from "next/navigation";
import {PDFUploader} from "../components/PdfUpload";
import { useState } from "react";
import "../globals.css";

export default function Home() {
    const [fileName, setFileName] = useState<string | null>(null);
  const router = useRouter();
  return (
    <main className="main">
        <div className="Heading">
            <h1 className="heading_title">
                ThinkPDF
            </h1>
            <h2 className="heading_subtitle">
                Upload your document and get instant answers. Ask anything about<br></br> your PDF content.
            </h2>
        </div>
        <PDFUploader
          currentFile={fileName}
          onUploaded={(name, charCount) => {
            setFileName(name);
            router.push(
            `/chat?file=${encodeURIComponent(name)}&chars=${charCount}`
            );
          }}
          onClear={() => setFileName(null)}
        />
    </main>
  );
}
