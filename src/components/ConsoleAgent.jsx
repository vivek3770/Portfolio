import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, ArrowRight } from 'lucide-react';

const PRESETS = [
  { label: 'Skills Matrix', cmd: '/skills' },
  { label: 'Key Projects', cmd: '/projects' },
  { label: 'Contact Info', cmd: '/contact' },
  { label: 'About Vivek', cmd: '/about' }
];

const RESPONSES = {
  '/skills': `
CORE COGNITIVE MODULES DETECTED:
----------------------------------------
1. GenAI & Agents : LangGraph (Multi-Agent platforms), LangChain, RAG architectures, ChromaDB.
2. AI/ML & DL     : PyTorch (primary model builder), TensorFlow, LightGBM, Transformers.
3. Backend & DBs  : FastAPI (sub-second compound scoring), REST APIs, MongoDB, MySQL.
4. Languages      : Python, Java (DSA champion), JavaScript, SQL, C.
5. DevOps & Tools : Docker (secure sandbox virtualization), Git/GitHub, Vercel, Postman.
`,
  '/projects': `
DEPLOYED AI/ML & FULL-STACK SYSTEMS:
----------------------------------------
1. CodeMind: Autonomous React/FastAPI IDE. Implemented secure Docker sandboxes and ChromaDB RAG.
2. SafeOps AI: LangGraph-based platform orchestrating 5 specialized agents for industrial safety.
3. Multimodal Price Prediction: Dual-tower neural net fusing DistilBERT text and EfficientNet image features.
`,
  '/contact': `
ESTABLISHING OUTBOUND COMMS PORT...
----------------------------------------
Email    : vivekku9873@gmail.com
LinkedIn : https://www.linkedin.com (Vivek Kumar)
GitHub   : https://github.com (vivekku9873)
LeetCode : https://leetcode.com
Status   : Available for AI/ML & Backend positions.
`,
  '/about': `
AGENT SUMMARY: VIVEK KUMAR
----------------------------------------
Role       : AI/ML & Backend Engineer | GenAI & Agentic Systems
Location   : Delhi, India
Education  : B.Tech CSE student, Ajay Kumar Garg Engineering College (AKGEC) (2023-2027)
Credential : Top 20% National Rank in Amazon ML Challenge (80k+ competitors)
Specialty  : Building reasoning agent workflows, training models, and architecting production backend APIs.
`
};

const ConsoleAgent = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'CONNECTING TO VIVEK_AGENT_v1.0.4...' },
    { type: 'sys', text: 'CONNECTION ESTABLISHED. SECURITY HANDSHAKE OK.' },
    { type: 'sys', text: 'Type a command or select a preset chip below. Try typing "What is SafeOps AI?".' }
  ]);
  const consoleBottomRef = useRef(null);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const userLine = { type: 'user', text: trimmed };
    let replyLine = { type: 'reply', text: '' };

    const cmdLower = trimmed.toLowerCase();

    if (RESPONSES[trimmed]) {
      replyLine.text = RESPONSES[trimmed];
    } else if (cmdLower === '/clear') {
      setHistory([]);
      return;
    } else if (cmdLower === '/help') {
      replyLine.text = `
AVAILABLE SLASH COMMANDS:
-------------------------
/skills   - Lists Vivek's technical skill stack
/projects - Summarizes Vivek's core engineering projects
/about    - Displays professional summary and education details
/contact  - Outputs email, social, and GitHub comms endpoints
/clear    - Clears the console logs
`;
    } else {
      // Custom NLP/Keyword responder
      if (cmdLower.includes('safeops') || cmdLower.includes('safety') || cmdLower.includes('platform')) {
        replyLine.text = `
[SafeOps AI Platform Summary]:
------------------------------
It's a multi-agent industrial safety platform that coordinates 5 specialized autonomous agents via LangGraph. 
Uses a PyTorch LSTM autoencoder for anomaly forecasting and YOLOv8 visual pipelines. 
FastAPI microservice handles sub-second risk calculations.
`;
      } else if (cmdLower.includes('codemind') || cmdLower.includes('ide') || cmdLower.includes('editor')) {
        replyLine.text = `
[CodeMind Full Stack IDE Summary]:
------------------------------
An autonomous AI-native code editor leveraging Gemini 2.5 Flash & CodeBERT. 
Features real-time code generation, auto-fixing, ChromaDB RAG memory pipeline, 
and secure Docker container sandboxes for live terminal code execution.
`;
      } else if (cmdLower.includes('price') || cmdLower.includes('amazon ml') || cmdLower.includes('prediction')) {
        replyLine.text = `
[Multimodal Product Price Predictor]:
------------------------------------
A dual-tower regressor model built for the Amazon ML Challenge 2025.
Fuses text embeddings from DistilBERT and visual features from EfficientNet. 
Achieved a SMAPE score of 57.45, ranking in the Top 20% of 80,000+ national competitors.
`;
      } else if (cmdLower.includes('drdo') || cmdLower.includes('residency') || cmdLower.includes('defense')) {
        replyLine.text = `
[DRDO Specialized Residency]:
-----------------------------
Vivek completed a 5-day residency on MLOps and Agentic AI for Defense Computing 
hosted by DRDO & NIT Delhi, engineering mission-critical deployment pipelines.
`;
      } else if (cmdLower.includes('java') || cmdLower.includes('dsa') || cmdLower.includes('leetcode')) {
        replyLine.text = `
[DSA & Competitive Programming]:
--------------------------------
Vivek is a skilled problem solver, having successfully completed 400+ algorithmic 
problems in Java across LeetCode and CodeChef, ranking in the top 10% in college contests.
`;
      } else if (cmdLower.includes('hire') || cmdLower.includes('available') || cmdLower.includes('job') || cmdLower.includes('email')) {
        replyLine.text = `
[Recruiter Hotlink]:
--------------------
Vivek is currently active in the market for AI/ML & Backend development opportunities.
Direct email: vivekku9873@gmail.com
You can also connect on LinkedIn: https://www.linkedin.com
`;
      } else {
        replyLine.text = `
Command not recognized: "${trimmed}". 
Type /help for standard directories, or ask about "SafeOps AI", "CodeMind", "DRDO", or "contact".
`;
      }
    }

    setHistory((prev) => [...prev, userLine, replyLine]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="glass-panel cyan-card p-6 flex flex-col" style={{ height: '480px' }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-default pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="text-accent-cyan w-5 h-5 pulse-glow-violet" />
          <h3 className="text-md font-mono font-bold text-white">AgenticTerminalConsole v1.0</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 bg-slate-950-80 rounded-xl p-4 overflow-y-auto font-mono text-12px border border-slate-900 mb-4 text-slate-300 space-y-2">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {line.type === 'sys' && (
              <div className="text-accent-violet">
                <span className="text-accent-cyan font-bold">[SYS]</span> {line.text}
              </div>
            )}
            {line.type === 'user' && (
              <div className="text-white font-bold flex items-center gap-1">
                <ArrowRight className="w-3-5 h-3-5 text-accent-cyan" />
                <span>guest@vivek-net:~$ {line.text}</span>
              </div>
            )}
            {line.type === 'reply' && (
              <div className="text-slate-300 pl-4 border-l border-slate-900">
                {line.text}
              </div>
            )}
          </div>
        ))}
        <div ref={consoleBottomRef} />
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.cmd}
            onClick={() => handleCommand(preset.cmd)}
            className="px-3 py-1-5 rounded-lg bg-slate-900 border border-default text-text-muted hover:text-accent-cyan hover:border-accent-cyan font-mono text-10px cursor-pointer transition-all duration-300"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-slate-950 border border-default rounded-xl px-3 py-2">
        <span className="font-mono text-xs text-accent-cyan font-bold">vivek-net$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask Vivek's AI Agent or type /help..."
          className="flex-1 bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder-text-dark"
        />
        <button
          onClick={() => handleCommand(input)}
          className="text-accent-cyan hover:text-white p-1 rounded transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConsoleAgent;
