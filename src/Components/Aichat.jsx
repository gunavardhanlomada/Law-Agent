// src/components/LegalChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf"; // ✅ Correct import
import "../Styles/LegalChat.css";

const LegalChat = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([
    "👋 Hello! I'm your AI legal assistant. How can I help you today?",
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Switch tabs with different initial messages
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "general") {
      setMessages(["👋 Hello! I'm your AI legal assistant. How can I help you today?"]);
    } else {
      setMessages(["⚖️ Welcome to Legal Advocate Chat. How can I assist you with legal issues?"]);
    }
  };

  // ✅ File upload
  const handleFileUpload = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setUploadedFile(f);
      alert(`Uploaded: ${f.name}`);
    }
  };

  // ✅ Send message + AI reply placeholder
  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = `You: ${input}`;
    setMessages((m) => [...m, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((m) => [...m, `AI: (placeholder reply to "${input}")`]);
    }, 800);
  };

  // ✅ Export Chat as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    messages.forEach((line, i) => {
      doc.text(line, 10, 10 + i * 8);
    });
    doc.save("chat.pdf");
  };

  // ✅ Quick prompt click → chat instantly
  const handlePromptClick = (prompt) => {
    setInput(prompt);
    setTimeout(() => handleSend(), 200);
  };

  return (
    <div className="page">  {/* ✅ Background applied here */}
      <div className="legal-chat-page">
        <h1 className="chat-title">AI Legal Chat</h1>

        <div className="chat-tabs">
          <button
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => handleTabSwitch("general")}
          >
            💬 General Chat
          </button>
          <button
            className={`tab ${activeTab === "legal" ? "active" : ""}`}
            onClick={() => handleTabSwitch("legal")}
          >
            ⚖️ Legal Advocate Chat
          </button>
        </div>

        <div className="chat-layout">
          <div className="chat-box">
            <div className="messages">
              {messages.map((msg, i) => (
                <div key={i} className="message">{msg}</div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your legal question..."
              />
              <button className="send-btn" onClick={handleSend}>🚀 Send</button>
            </div>
          </div>

          <aside className="side-panel">
            <div className="upload-section">
              <h3>📎 Upload Documents</h3>
              <label className="upload-box">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
                Upload PDF/DOCX
              </label>
              {uploadedFile && <div className="uploaded-name">Uploaded: {uploadedFile.name}</div>}
            </div>

            <div className="prompts">
              <h3>⚡ Quick Prompts</h3>
              <button onClick={() => handlePromptClick("Draft a legal notice")}>📜 Draft a legal notice</button>
              <button onClick={() => handlePromptClick("Summarize this contract")}>📄 Summarize this contract</button>
              <button onClick={() => handlePromptClick("Explain this law in simple terms")}>💡 Explain this law in simple terms</button>
            </div>
          </aside>
        </div>

        <div className="export-row">
          <button className="export-btn" onClick={handleExportPDF}>
            📄 Export Chat (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalChat;
