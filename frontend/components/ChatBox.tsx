"use client";

import { askQuestion } from "../lib/api";
import { useState } from "react";
import AnswerBox from "./AnswerBox";
import { FileText, Send, UserIcon, BotMessageSquare} from "lucide-react";
import { useSearchParams } from "next/navigation";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  
  const fileName = searchParams.get("file");

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askQuestion(question);

      const aiMessage: Message = {
        role: "ai",
        content: res.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox-container">
    <div className="chatbox-header">
        <FileText className="chatbox-icon" />
        <div className="chatbox-header-text">
          <h2 className="chatbox-title">Document Assistant</h2>
          <p className="chatbox-subtitle">Asking about: {fileName}</p>
        </div>
      </div>
    <div className="chatbox-wrapper">
      {/* Messages */}
      
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.role === "user" ? "user-message" : "ai-message"
            }`}
          > 
            <div className={`icon ${
              msg.role === "user" ? "user-msg-bot" : "ai-msg-bot"
            }`}>
              <BotMessageSquare className="message-user-icon" />
            </div>
            <div className="message-bubble">{msg.content}</div>
            <div className={`icon ${
              msg.role === "user" ? "user-msg-icon" : "ai-msg-icon"
            }`}>
              <UserIcon className="message-user-icon" />
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai-message">
            <div className="ai-msg-bot">
              <BotMessageSquare className="message-user-icon" />
            </div>
            <div className="message-bubble">Analyzing document...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input-box">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the document..."
          className="chat-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />
        <button onClick={handleAsk} className="chat-send-btn">
          <Send className="chat-send-icon" />
        </button>
      </div>
    </div>
    </div>
  );
}
