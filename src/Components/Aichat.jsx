// // src/components/LegalChat.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { jsPDF } from "jspdf"; // ✅ Correct import
// import "../Styles/LegalChat.css";

// const LegalChat = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [messages, setMessages] = useState([
//     "👋 Hello! I'm your AI legal assistant. How can I help you today?",
//   ]);
//   const [input, setInput] = useState("");
//   const [activeTab, setActiveTab] = useState("general");
//   const messagesEndRef = useRef(null);

//   // ✅ Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Switch tabs with different initial messages
//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     if (tab === "general") {
//       setMessages(["👋 Hello! I'm your AI legal assistant. How can I help you today?"]);
//     } else {
//       setMessages(["⚖️ Welcome to Legal Advocate Chat. How can I assist you with legal issues?"]);
//     }
//   };

//   // ✅ File upload
//   const handleFileUpload = (e) => {
//     const f = e.target.files?.[0];
//     if (f) {
//       setUploadedFile(f);
//       alert(`Uploaded: ${f.name}`);
//     }
//   };

//   // ✅ Send message + AI reply placeholder
//   const handleSend = () => {
//     if (!input.trim()) return;
//     const userMessage = `You: ${input}`;
//     setMessages((m) => [...m, userMessage]);
//     setInput("");

//     setTimeout(() => {
//       setMessages((m) => [...m, `AI: (placeholder reply to "${input}")`]);
//     }, 800);
//   };

//   // ✅ Export Chat as PDF
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     messages.forEach((line, i) => {
//       doc.text(line, 10, 10 + i * 8);
//     });
//     doc.save("chat.pdf");
//   };

//   // ✅ Quick prompt click → chat instantly
//   const handlePromptClick = (prompt) => {
//     setInput(prompt);
//     setTimeout(() => handleSend(), 200);
//   };

//   return (
//     <div className="page">  {/* ✅ Background applied here */}
//       <div className="legal-chat-page">
//         <h1 className="chat-title">AI Legal Chat</h1>

//         <div className="chat-tabs">
//           <button
//             className={`tab ${activeTab === "general" ? "active" : ""}`}
//             onClick={() => handleTabSwitch("general")}
//           >
//             💬 General Chat
//           </button>
//           <button
//             className={`tab ${activeTab === "legal" ? "active" : ""}`}
//             onClick={() => handleTabSwitch("legal")}
//           >
//             ⚖️ Legal Advocate Chat
//           </button>
//         </div>

//         <div className="chat-layout">
//           <div className="chat-box">
//             <div className="messages">
//               {messages.map((msg, i) => (
//                 <div key={i} className="message">{msg}</div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="chat-input">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your legal question..."
//               />
//               <button className="send-btn" onClick={handleSend}>🚀 Send</button>
//             </div>
//           </div>

//           <aside className="side-panel">
//             <div className="upload-section">
//               <h3>📎 Upload Documents</h3>
//               <label className="upload-box">
//                 <input
//                   type="file"
//                   accept=".pdf,.docx"
//                   onChange={handleFileUpload}
//                 />
//                 Upload PDF/DOCX
//               </label>
//               {uploadedFile && <div className="uploaded-name">Uploaded: {uploadedFile.name}</div>}
//             </div>

//             <div className="prompts">
//               <h3>⚡ Quick Prompts</h3>
//               <button onClick={() => handlePromptClick("Draft a legal notice")}>📜 Draft a legal notice</button>
//               <button onClick={() => handlePromptClick("Summarize this contract")}>📄 Summarize this contract</button>
//               <button onClick={() => handlePromptClick("Explain this law in simple terms")}>💡 Explain this law in simple terms</button>
//             </div>
//           </aside>
//         </div>

//         <div className="export-row">
//           <button className="export-btn" onClick={handleExportPDF}>
//             📄 Export Chat (PDF)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalChat;














// src/components/LegalChat.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { jsPDF } from "jspdf";
// import axios from "axios";
// import "../Styles/LegalChat.css";

// const API_BASE = "http://localhost";

// const LegalChat = () => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [messages, setMessages] = useState([
//     "👋 Hello! I'm your AI legal assistant. How can I help you today?",
//   ]);
//   const [input, setInput] = useState("");
//   const [activeTab, setActiveTab] = useState("general");
//   const [sessionId, setSessionId] = useState(null);
//   const messagesEndRef = useRef(null);

//   // ✅ Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Start session when tab switches
//   const handleTabSwitch = async (tab) => {
//     setActiveTab(tab);
//     setMessages([
//       tab === "general"
//         ? "👋 Hello! I'm your AI legal assistant. How can I help you today?"
//         : "⚖️ Welcome to Legal Advocate Chat. How can I assist you with legal issues?",
//     ]);

//     try {
//       const res = await axios.post(
//         `${API_BASE}/${tab === "general" ? "text" : "advocate"}/start`
//       );
//       setSessionId(res.data.session_id);
//     } catch (err) {
//       console.error("Session start failed:", err);
//     }
//   };

//   // ✅ File upload
//   const handleFileUpload = async (e) => {
//     const f = e.target.files?.[0];
//     if (!f || !sessionId) return;

//     setUploadedFile(f);

//     const formData = new FormData();
//     formData.append("session_id", sessionId);
//     formData.append("files", f);

//     try {
//       await axios.post(
//         `${API_BASE}/${activeTab === "general" ? "text" : "advocate"}/upload`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert(`Uploaded: ${f.name}`);
//     } catch (err) {
//       console.error("File upload failed:", err);
//     }
//   };

//   // ✅ Send message
//   const handleSend = async () => {
//     if (!input.trim() || !sessionId) return;

//     const userMessage = `You: ${input}`;
//     setMessages((m) => [...m, userMessage]);

//     try {
//       const res = await axios.post(
//         `${API_BASE}/${activeTab === "general" ? "text" : "advocate"}/message`,
//         {
//           session_id: sessionId,
//           question: input,
//         }
//       );

//       setMessages((m) => [...m, `AI: ${res.data.answer}`]);
//     } catch (err) {
//       console.error("Message send failed:", err);
//       setMessages((m) => [...m, "❌ Error: Could not get reply."]);
//     }

//     setInput("");
//   };

//   // ✅ Export chat as PDF
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     messages.forEach((line, i) => {
//       doc.text(line, 10, 10 + i * 8);
//     });
//     doc.save("chat.pdf");
//   };

//   // ✅ Quick prompt → instant send
//   const handlePromptClick = (prompt) => {
//     setInput(prompt);
//     setTimeout(() => handleSend(), 200);
//   };

//   return (
//     <div className="page">
//       <div className="legal-chat-page">
//         <h1 className="chat-title">AI Legal Chat</h1>

//         {/* Tabs */}
//         <div className="chat-tabs">
//           <button
//             className={`tab ${activeTab === "general" ? "active" : ""}`}
//             onClick={() => handleTabSwitch("general")}
//           >
//             💬 General Chat
//           </button>
//           <button
//             className={`tab ${activeTab === "legal" ? "active" : ""}`}
//             onClick={() => handleTabSwitch("legal")}
//           >
//             ⚖️ Legal Advocate Chat
//           </button>
//         </div>

//         {/* Chat Layout */}
//         <div className="chat-layout">
//           <div className="chat-box">
//             <div className="messages">
//               {messages.map((msg, i) => (
//                 <div key={i} className="message">{msg}</div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="chat-input">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your legal question..."
//               />
//               <button className="send-btn" onClick={handleSend}>🚀 Send</button>
//             </div>
//           </div>

//           <aside className="side-panel">
//             {/* File Upload */}
//             <div className="upload-section">
//               <h3>📎 Upload Documents</h3>
//               <label className="upload-box">
//                 <input
//                   type="file"
//                   accept=".pdf,.docx"
//                   onChange={handleFileUpload}
//                 />
//                 Upload PDF/DOCX
//               </label>
//               {uploadedFile && (
//                 <div className="uploaded-name">Uploaded: {uploadedFile.name}</div>
//               )}
//             </div>

//             {/* Quick Prompts */}
//             <div className="prompts">
//               <h3>⚡ Quick Prompts</h3>
//               <button onClick={() => handlePromptClick("Draft a legal notice")}>
//                 📜 Draft a legal notice
//               </button>
//               <button onClick={() => handlePromptClick("Summarize this contract")}>
//                 📄 Summarize this contract
//               </button>
//               <button onClick={() => handlePromptClick("Explain this law in simple terms")}>
//                 💡 Explain this law in simple terms
//               </button>
//             </div>
//           </aside>
//         </div>

//         {/* Export PDF */}
//         <div className="export-row">
//           <button className="export-btn" onClick={handleExportPDF}>
//             📄 Export Chat (PDF)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalChat;


// src/components/LegalChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import "../Styles/LegalChat.css";

const API_BASE = "http://localhost"; 

const LegalChat = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([
    "👋 Hello! I'm your AI legal assistant. How can I help you today?",
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Restore session from sessionStorage on tab change
  useEffect(() => {
    const savedGeneral = sessionStorage.getItem("text_session_id");
    const savedAdvocate = sessionStorage.getItem("advocate_session_id");

    if (activeTab === "general" && savedGeneral) {
      setSessionId(savedGeneral);
    } else if (activeTab === "legal" && savedAdvocate) {
      setSessionId(savedAdvocate);
    }
  }, [activeTab]);

  // ✅ Start session when switching tabs (only if not already saved)
  const handleTabSwitch = async (tab) => {
  setActiveTab(tab);
  setMessages([
    tab === "general"
      ? "👋 Hello! I'm your AI legal assistant. How can I help you today?"
      : "⚖️ Welcome to Legal Advocate Chat. How can I assist you with legal issues?",
  ]);

  // 🔑 Use the tab param directly instead of activeTab
  const sessionKey = tab === "general" ? "text_session_id" : "advocate_session_id";
  const savedSessionId = sessionStorage.getItem(sessionKey);

  if (savedSessionId) {
    setSessionId(savedSessionId);
    console.log(`♻️ Reusing session for ${tab}:`, savedSessionId);
    return;
  }

  try {
    const res = await axios.post(
      `${API_BASE}/${tab === "general" ? "text" : "advocate"}/start`
    );
    setSessionId(res.data.session_id);
    sessionStorage.setItem(sessionKey, res.data.session_id);

  } catch (err) {
    console.error("Session start failed:", err);
  }
};


  // ✅ File upload
  const handleFileUpload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const sessionKey = activeTab === "general" ? "text_session_id" : "advocate_session_id";
    const currentSessionId = sessionStorage.getItem(sessionKey);

    if (!currentSessionId) {
      alert("⚠️ No session found. Please start a chat first.");
      return;
    }

    setUploadedFile(f);

    const formData = new FormData();
    formData.append("session_id", currentSessionId);
    formData.append("files", f);

    try {
      await axios.post(
        `${API_BASE}/${activeTab === "general" ? "text" : "advocate"}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(`Uploaded: ${f.name}`);
    } catch (err) {
      console.error("File upload failed:", err);
    }
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const sessionKey = activeTab === "general" ? "text_session_id" : "advocate_session_id";
    const currentSessionId = sessionStorage.getItem(sessionKey);

    if (!currentSessionId) {
      setMessages((m) => [...m, "⚠️ No session found. Please start a chat again."]);
      return;
    }

    const userMessage = `You: ${input}`;
    setMessages((m) => [...m, userMessage]);

    try {
      const res = await axios.post(
        `${API_BASE}/${activeTab === "general" ? "text" : "advocate"}/message`,
        {
          session_id: currentSessionId,
          question: input,
        }
      );

      setMessages((m) => [...m, `AI: ${res.data.answer}`]);
      console.log("📌 Sending with sessionId:", currentSessionId);

    } catch (err) {
      console.error("Message send failed:", err);
      setMessages((m) => [...m, "❌ Error: Could not get reply."]);
    }

    setInput("");
  };

  // ✅ Export chat as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    messages.forEach((line, i) => {
      doc.text(line, 10, 10 + i * 8);
    });
    doc.save("chat.pdf");
  };

  // ✅ Quick prompt → instant send
  const handlePromptClick = (prompt) => {
    setInput(prompt);
    setTimeout(() => handleSend(), 200);
  };

  return (
    <div className="page">
      <div className="legal-chat-page">
        <h1 className="chat-title">AI Legal Chat</h1>

        {/* Tabs */}
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

        {/* Chat Layout */}
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
            {/* File Upload */}
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
              {uploadedFile && (
                <div className="uploaded-name">Uploaded: {uploadedFile.name}</div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="prompts">
              <h3>⚡ Quick Prompts</h3>
              <button onClick={() => handlePromptClick("Draft a legal notice")}>
                📜 Draft a legal notice
              </button>
              <button onClick={() => handlePromptClick("Summarize this contract")}>
                📄 Summarize this contract
              </button>
              <button onClick={() => handlePromptClick("Explain this law in simple terms")}>
                💡 Explain this law in simple terms
              </button>
            </div>
          </aside>
        </div>

        {/* Export PDF */}
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
