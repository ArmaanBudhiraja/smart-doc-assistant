"use client";

import ChatBox from "../../components/ChatBox";
import { FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();

  const fileName = searchParams.get("file");
  const charCount = searchParams.get("chars");

  return (
    <main className="main">
      <div className="Heading">
        <h1 className="heading_title">ThinkPDF</h1>
        <h2 className="heading_subtitle">
          Upload your document and get instant answers. Ask anything about<br />
          your PDF content.
        </h2>
      </div>

      <div className="chat-container">
        {fileName && (
            <div className="file-info-section">
            <div className="info-box">
                <FileText className="info-icon" />
                <div>
                    <div className="filename-wrapper">
                        <p className="info-text">{fileName}</p>
                        <span className="filename-tooltip">{fileName}</span>
                    </div>
                {charCount && (
                    <p className="info-subtext">
                    {Number(charCount).toLocaleString()} characters
                    </p>
                )}
                </div>
            </div>
            <div className="tips-box">
                <p className="tips-heading">Tips</p>
                <ul className="tips-list">
                    <li>Be specific with your questions.</li>
                    <li>Provide context or examples.</li>
                    <li>Use clear and concise language.</li>
                </ul>
            </div>
            <button className="upload-another-document" onClick={() => {
                window.location.href = "/";
            }}>
                Upload another document
            </button>
          </div>
        )}

        <ChatBox />
      </div>
      
    </main>
  );
}
