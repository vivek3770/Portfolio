import React, { useState, useRef, useEffect } from 'react';

// Knowledge base about Vivek Kumar
const KB = {
  skills: [
    'Python', 'Java', 'JavaScript', 'C',
    'PyTorch', 'TensorFlow', 'Scikit-Learn', 'LightGBM', 'YOLOv8', 'OpenCV',
    'LangGraph', 'LangChain', 'ChromaDB', 'RAG', 'Gemini API', 'Claude API',
    'FastAPI', 'Node.js', 'Express', 'REST APIs',
    'MongoDB', 'MySQL', 'PostgreSQL',
    'Docker', 'Git', 'GitHub', 'Postman', 'Vercel',
    'React', 'HTML', 'CSS',
  ],
  projects: [
    {
      name: 'CodeMind IDE',
      desc: 'A full-stack AI-powered coding IDE with Docker sandboxed code execution, RAG-based documentation retrieval, and a LangGraph multi-agent debugger that autonomously fixes runtime errors.',
      tech: ['Python', 'FastAPI', 'LangGraph', 'Docker', 'ChromaDB', 'React'],
    },
    {
      name: 'SafeOps AI',
      desc: 'Multi-agent AI copilot for DevOps security. Monitors infra logs, detects anomalies, classifies threats, and auto-generates remediation commands using stateful LangGraph execution.',
      tech: ['Python', 'LangGraph', 'LangChain', 'YOLOv8', 'FastAPI', 'MongoDB'],
    },
    {
      name: 'Multimodal Price Predictor',
      desc: 'Amazon ML Challenge entry achieving Top 20% nationally. Fuses BERT text embeddings + CNN image vectors in a dual-tower architecture with LightGBM ensemble for product pricing.',
      tech: ['PyTorch', 'BERT', 'ResNet', 'LightGBM', 'Scikit-Learn', 'Python'],
    },
  ],
  certs: [
    'Oracle Cloud AI Foundations Associate (2025)',
    'DRDO & NIT Delhi MLOps Residency (2025)',
    'Amazon ML Challenge Top 20% (2025)',
    'Mastering OOPs with Python — Infosys Springboard (2024)',
    'Machine Learning Specialist — Simplilearn (2024)',
  ],
  contact: {
    email: 'vivekku9873@gmail.com',
    github: 'github.com/vivekku9873',
    location: 'Delhi, India',
    college: 'Ajay Kumar Garg Engineering College (AKGEC), B.Tech CSE 2023–2027',
  },
};

const respond = (input) => {
  const q = input.toLowerCase().trim();

  if (!q) return null;

  if (/^(hi|hello|hey|hola|namaste|sup)/.test(q)) {
    return "Hey there! 👋 I'm Vivek's AI assistant. Ask me anything about his skills, projects, education, certifications, or how to get in touch!";
  }
  if (/who (are you|is this|is vivek)/.test(q) || q === 'about') {
    return "Vivek Kumar is an AI/ML Engineer & Backend Architect studying B.Tech CSE at AKGEC (2023–2027). He specializes in building agentic AI systems, training deep learning models, and architecting scalable backends with FastAPI and Docker.";
  }
  if (/skill|tech|stack|language|tool|framework|know/.test(q)) {
    return `Vivek's tech stack spans:\n• AI/ML: PyTorch, TensorFlow, LightGBM, OpenCV, Scikit-Learn, Hugging Face\n• GenAI: LangGraph, LangChain, ChromaDB, RAG, Gemini/Claude APIs\n• Backend: FastAPI, Node.js / Express (Familiar), MongoDB, MySQL, REST APIs\n• Languages: Python, Java, JavaScript, C\n• Tools: Docker, Git, GitHub, Postman, Vercel`;
  }
  if (/project|build|work|creat/.test(q)) {
    return `Here are Vivek's 3 core projects:\n\n1. **CodeMind IDE** — AI-powered coding IDE with Docker sandboxes and LangGraph auto-debugger\n2. **SafeOps AI** — Multi-agent DevOps security copilot for anomaly detection\n3. **Multimodal Price Predictor** — Amazon ML Challenge, Top 20% nationally (BERT + CNN + LightGBM)`;
  }
  if (/codemind|ide/.test(q)) {
    return `**CodeMind IDE** is Vivek's flagship project — a full-stack AI coding environment featuring Docker sandboxed execution, RAG-based doc retrieval (ChromaDB + LangChain), and a LangGraph multi-agent debugger that auto-fixes runtime errors. Built with FastAPI + React.`;
  }
  if (/safeops|security|devops|copilot/.test(q)) {
    return `**SafeOps AI** is a multi-agent security copilot for DevOps. It uses LangGraph state graphs to monitor infrastructure logs, detect anomalies with YOLOv8, classify threat severity, and auto-generate remediation commands — all autonomously.`;
  }
  if (/amazon|price|predict|ml challenge|multimodal/.test(q)) {
    return `**Multimodal Price Predictor** — Vivek's Amazon ML Challenge entry. Ranked Top 20% nationally among 80,000+ teams. Uses a dual-tower architecture fusing BERT text embeddings + ResNet image vectors with a LightGBM ensemble regressor.`;
  }
  if (/cert|certif|oracle|drdo|infosys|simplilearn/.test(q)) {
    return `Vivek's certifications:\n• Oracle Cloud AI Foundations Associate (2025)\n• DRDO & NIT Delhi MLOps Residency (2025)\n• Amazon ML Challenge Top 20% (2025)\n• OOPs with Python — Infosys Springboard (2024)\n• ML Specialist — Simplilearn (2024)`;
  }
  if (/educat|college|university|akgec|degree|cgpa|gpa/.test(q)) {
    return `Vivek is pursuing B.Tech in Computer Science at Ajay Kumar Garg Engineering College (AKGEC), Ghaziabad — Class of 2027. Current CGPA: 7.75/10.`;
  }
  if (/leetcode|dsa|compet|problem|algo|java/.test(q)) {
    return `Vivek has solved 400+ DSA problems in Java across LeetCode and CodeChef. He's in the Top 10% on competitive programming contests with strong expertise in graph theory, dynamic programming, and algorithmic complexity.`;
  }
  if (/contact|email|reach|hire|work with|freelanc/.test(q)) {
    return `You can reach Vivek at:\n📧 vivekku9873@gmail.com\n🐙 github.com/vivekku9873\n📍 Delhi, India\n\nHe's open to full-time roles, freelance AI projects, and research collaborations!`;
  }
  if (/langgraph|langchain|agent|rag|chromadb/.test(q)) {
    return `Vivek specializes in **Agentic AI** — building stateful multi-agent systems using LangGraph execution graphs, LangChain tools, ChromaDB vector stores, and RAG pipelines. His systems are designed for autonomous task planning, self-debugging, and memory-aware workflows.`;
  }
  if (/docker|contain|sandbox/.test(q)) {
    return `Vivek has deep experience with Docker for building secure containerized sandboxes — especially in CodeMind IDE where untrusted user code runs inside isolated Docker runtimes with resource limits and network restrictions.`;
  }
  if (/fastapi|backend|api|microserv/.test(q)) {
    return `Vivek builds high-performance async backends using FastAPI, MongoDB, and REST APIs. His architecture focuses on clean separation of concerns, async I/O for ML inference pipelines, and Docker-based deployment.`;
  }
  if (/drdo|nit delhi|residency|defense/.test(q)) {
    return `In 2025, Vivek completed a prestigious 5-day residency at **DRDO & NIT Delhi** focused on MLOps and Agentic AI for defense computing. This involved production deployment strategies for sensitive AI workloads.`;
  }
  if (/thank|thanks|cool|nice|great|awesome/.test(q)) {
    return "You're welcome! 😊 Feel free to ask me anything else about Vivek. You can also scroll down to the Contact section to reach him directly!";
  }
  if (/bye|goodbye|see you|later/.test(q)) {
    return "Goodbye! Feel free to chat anytime. You can always reach Vivek at vivekku9873@gmail.com 👋";
  }

  return `I'm not sure about that specifically, but I can tell you about Vivek's **skills**, **projects**, **certifications**, **education**, or **contact info**. What would you like to know?`;
};

const SUGGESTIONS = ['Skills', 'Projects', 'Certifications', 'Contact', 'CodeMind IDE', 'About Vivek'];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Hi! I'm Vivek's AI assistant 🤖\nAsk me about his skills, projects, certifications, or how to reach him!",
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: msg }]);
    setThinking(true);

    setTimeout(() => {
      const reply = respond(msg);
      setThinking(false);
      if (reply) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }]);
      }
    }, 600 + Math.random() * 400);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple markdown-like bold rendering
  const renderText = (text) => {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part.split('\n').map((line, j) => (
        <span key={j}>{line}{j < part.split('\n').length - 1 && <br />}</span>
      ))
    );
  };

  return (
    <>
      {/* FAB */}
      <button
        className="chatbot-fab"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI chatbot"
      >
        {showBadge && <span className="chatbot-badge">1</span>}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v3" />
            <circle cx="12" cy="2" r="1" fill="currentColor" />
            <rect x="4" y="5" width="16" height="12" rx="4" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M9 14h6" />
            <path d="M2 10v2" />
            <path d="M22 10v2" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <div className="chatbot-name">Vivek's AI Assistant</div>
                <div className="chatbot-status">
                  <span className="chatbot-status-dot" /> Online
                </div>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg chat-msg-${msg.role}`}>
                <div className="chat-bubble">{renderText(msg.text)}</div>
              </div>
            ))}
            {thinking && (
              <div className="chat-msg chat-msg-bot">
                <div className="chat-bubble chat-thinking">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                className="chat-suggestion"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              className="chatbot-input"
              placeholder="Ask anything about Vivek..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || thinking}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
