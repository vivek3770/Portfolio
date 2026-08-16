import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Terminal, Zap, Shield, GitBranch, AlertCircle } from 'lucide-react';

// Detailed skill definition structure
const SKILL_DATA = {
  id: 'root',
  name: 'Vivek',
  desc: 'AI/ML & Backend Architect',
  type: 'core',
  children: [
    {
      id: 'genai',
      name: 'GenAI & Agents',
      desc: 'Orchestrating intelligent, stateful reasoning agents and memory engines.',
      type: 'category',
      color: '#00f2fe',
      children: [
        { id: 'langgraph', name: 'LangGraph', desc: 'Used for complex, stateful multi-agent workflows. Powering Vivek\'s SafeOps AI platform to orchestrate 5 specialized autonomous agents.', rating: 95 },
        { id: 'langchain', name: 'LangChain', desc: 'Chaining LLM outputs, managing agents, templates, and memory storage.', rating: 90 },
        { id: 'rag', name: 'RAG Systems', desc: 'Building semantic retrieval systems using vector caching, query rewriting, and chunk optimization.', rating: 92 },
        { id: 'chromadb', name: 'ChromaDB', desc: 'Vector database storing agentic memory, embeddings, and context metadata.', rating: 88 },
        { id: 'huggingface', name: 'Transformers', desc: 'Fine-tuning, caching, and deploying transformer models (DistilBERT, LLAMA).', rating: 85 }
      ]
    },
    {
      id: 'aiml',
      name: 'AI/ML & DL',
      desc: 'Developing deep neural networks, multimodal classifiers, and predictive algorithms.',
      type: 'category',
      color: '#8e2de2',
      children: [
        { id: 'pytorch', name: 'PyTorch', desc: 'Vivek\'s primary ML library. Used to train LSTM autoencoders for safety anomaly forecasting and dual-tower pricing regressors.', rating: 95 },
        { id: 'tensorflow', name: 'TensorFlow', desc: 'Deep learning frameworks, model optimization, and deployment pipelines.', rating: 80 },
        { id: 'scikitlearn', name: 'Scikit-Learn', desc: 'Classic regression, classification, clustering, and data preprocessing pipelines.', rating: 90 },
        { id: 'lightgbm', name: 'LightGBM', desc: 'Gradient boosting model utilized in Amazon ML Challenge pricing predictions.', rating: 85 },
        { id: 'cv', name: 'OpenCV / YOLOv8', desc: 'Vision pipeline construction for industrial hazard detection and spatial graphs.', rating: 88 }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & DBs',
      desc: 'Building high-performance APIs, microservices, and databases.',
      type: 'category',
      color: '#ff007f',
      children: [
        { id: 'fastapi', name: 'FastAPI', desc: 'Asynchronous API development. Integrated sub-second compound risk scoring microservices in SafeOps AI.', rating: 95 },
        { id: 'mongodb', name: 'MongoDB', desc: 'NoSQL document storage for operational agent memory and config logs.', rating: 88 },
        { id: 'mysql', name: 'MySQL', desc: 'Relational database schema modeling, indexing, and query optimization.', rating: 85 },
        { id: 'rest', name: 'REST APIs', desc: 'Designing production-grade, self-documenting API architectures with robust security layers.', rating: 92 }
      ]
    },
    {
      id: 'languages',
      name: 'Languages',
      desc: 'Core development languages. Anchoring clean, structured, and fast logic.',
      type: 'category',
      color: '#39ff14',
      children: [
        { id: 'python', name: 'Python', desc: 'Primary language for ML, scripting, agents, and FastAPI microservices.', rating: 98 },
        { id: 'java', name: 'Java (DSA)', desc: 'Competitive programming driver. Solved 400+ problems on LeetCode/CodeChef. Mastered OOP and data structures.', rating: 92 },
        { id: 'javascript', name: 'JavaScript', desc: 'For responsive layouts, canvas rendering loops, and modular frontends.', rating: 88 },
        { id: 'sql', name: 'SQL', desc: 'Query authoring, optimization, joins, and database design.', rating: 85 }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps & Tools',
      desc: 'Deploying, scaling, and managing software lifecycles.',
      type: 'category',
      color: '#ff9f00',
      children: [
        { id: 'docker', name: 'Docker', desc: 'Creating containerized sandboxes. Used to build secure runtimes in CodeMind IDE.', rating: 90 },
        { id: 'git', name: 'Git/GitHub', desc: 'Version control, GitHub Actions, CI/CD, and team coordination.', rating: 92 },
        { id: 'postman', name: 'Postman', desc: 'Testing, mocking, and documenting REST endpoints.', rating: 90 },
        { id: 'vercel', name: 'Vercel / Cloud', desc: 'Serverless deployment and cloud scaling architectures.', rating: 85 }
      ]
    }
  ]
};

const SkillTree = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_DATA.children[0]);
  const [terminalLogs, setTerminalLogs] = useState([
    'SYSTEM: Click on any skill node to query its diagnostics database...',
    'SYSTEM: Skill system active. Mouseover categories to expand sub-branches.'
  ]);
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' or 'inventory'

  useEffect(() => {
    if (viewMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    let width = (canvas.width = containerRef.current.clientWidth || 800);
    let height = (canvas.height = 550);

    // Node representation on screen
    class ScreenNode {
      constructor(data, x, y, parent = null, angle = 0, distance = 0) {
        this.data = data;
        this.parent = parent;
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = data.type === 'core' ? 36 : data.type === 'category' ? 24 : 16;
        this.color = data.color || (parent ? parent.color : '#8e2de2');
        this.isHovered = false;
        this.angle = angle;
        this.distance = distance;
        this.expanded = data.type === 'core';
        this.pulse = 0;
      }

      update(mouse, centerX, centerY) {
        this.pulse += 0.05;

        // Calculate target positions based on parent expansion
        if (this.parent) {
          if (this.parent.expanded) {
            const targetX = this.parent.x + Math.cos(this.angle) * this.distance;
            const targetY = this.parent.y + Math.sin(this.angle) * this.distance;
            // Spring force towards target
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            this.vx += dx * 0.1;
            this.vy += dy * 0.1;
          } else {
            // Spring force towards parent node directly
            const dx = this.parent.x - this.x;
            const dy = this.parent.y - this.y;
            this.vx += dx * 0.2;
            this.vy += dy * 0.2;
            this.radius = 0; // hide it
            return;
          }
        } else {
          // Core node stays at center
          const dx = centerX - this.x;
          const dy = centerY - this.y;
          this.vx += dx * 0.1;
          this.vy += dy * 0.1;
        }

        // Apply physics (drag & spring damping)
        this.vx *= 0.75;
        this.vy *= 0.75;
        this.x += this.vx;
        this.y += this.vy;

        // Reset radius for child nodes
        if (this.data.type === 'child') {
          this.radius = 15;
        }

        // Mouse hover check
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < this.radius) {
            this.isHovered = true;
            // Hover repulsion / attraction effect
            this.x -= (dx / dist) * 2;
            this.y -= (dy / dist) * 2;
          } else {
            this.isHovered = false;
          }
        } else {
          this.isHovered = false;
        }
      }

      draw() {
        if (this.radius <= 0) return;

        // Draw connecting line to parent
        if (this.parent && this.parent.radius > 0) {
          ctx.beginPath();
          // Bezier curve to look organic
          const midX = (this.x + this.parent.x) / 2;
          ctx.moveTo(this.parent.x, this.parent.y);
          ctx.quadraticCurveTo(midX, this.parent.y, this.x, this.y);

          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.isHovered ? 2.5 : 1.2;
          ctx.stroke();

          // Pulsing dash animation on line
          ctx.save();
          ctx.setLineDash([4, 12]);
          ctx.lineDashOffset = -this.pulse * 10;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }

        // Draw node body
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Dynamic styling
        const glowRad = this.radius + (this.isHovered ? 8 : 4) + Math.sin(this.pulse) * 2;
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.4, this.x, this.y, glowRad);
        
        if (this.data.type === 'core') {
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.3, '#8e2de2');
          gradient.addColorStop(1, 'rgba(142, 45, 226, 0)');
        } else {
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(0.6, `${this.color}dd`);
          gradient.addColorStop(1, `${this.color}00`);
        }

        ctx.fillStyle = gradient;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.isHovered ? 18 : 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Draw label text
        ctx.fillStyle = '#ffffff';
        ctx.font = this.data.type === 'core' 
          ? 'bold 13px JetBrains Mono' 
          : this.data.type === 'category' 
          ? 'bold 11px Outfit' 
          : '10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw text background bubble on hover
        if (this.isHovered || this.data.type === 'core' || this.data.type === 'category') {
          const txt = this.data.name;
          const tw = ctx.measureText(txt).width;
          
          ctx.fillStyle = 'rgba(4, 4, 6, 0.85)';
          ctx.fillRect(this.x - tw / 2 - 6, this.y + this.radius + 6, tw + 12, 18);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(this.x - tw / 2 - 6, this.y + this.radius + 6, tw + 12, 18);

          ctx.fillStyle = '#ffffff';
          ctx.fillText(txt, this.x, this.y + this.radius + 15);
        } else {
          // Simply draw standard small label
          ctx.fillText(this.data.name[0], this.x, this.y);
        }
      }
    }

    // List of all nodes
    const nodes = [];
    const centerX = width / 2;
    const centerY = height / 2;

    // Create Core node
    const coreNode = new ScreenNode(SKILL_DATA, centerX, centerY);
    nodes.push(coreNode);

    // Create Category nodes and Child nodes
    const categories = SKILL_DATA.children;
    const catRadius = 110;
    const childRadius = 75;

    categories.forEach((cat, index) => {
      const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2;
      const catNode = new ScreenNode(cat, centerX, centerY, coreNode, angle, catRadius);
      nodes.push(catNode);

      // Create children
      const children = cat.children;
      children.forEach((child, cIndex) => {
        // Distribute children in an arc extending outwards
        const spreadAngle = Math.PI / 1.6; // angle spread
        const baseChildAngle = angle - spreadAngle / 2;
        const childAngle = baseChildAngle + (cIndex / (children.length - 1 || 1)) * spreadAngle;
        const childNode = new ScreenNode(child, centerX, centerY, catNode, childAngle, childRadius);
        nodes.push(childNode);
      });
    });

    const mouse = { x: null, y: null };

    // Hover and Click handler
    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Adjust coordinates according to client resolution scaling
      return {
        x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
      };
    };

    const handleMouseMove = (e) => {
      const pos = getMousePos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleCanvasClick = (e) => {
      const pos = getMousePos(e);
      let clickedNode = null;

      // Check which node is clicked (reverse loop to get top elements first)
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (node.radius > 0) {
          const dist = Math.hypot(pos.x - node.x, pos.y - node.y);
          if (dist < node.radius + 8) {
            clickedNode = node;
            break;
          }
        }
      }

      if (clickedNode) {
        // Handle click action
        if (clickedNode.data.type === 'category') {
          // Toggle expand children
          clickedNode.expanded = !clickedNode.expanded;
          
          // Log in terminal panel
          setTerminalLogs((prev) => [
            `LOG: Category [${clickedNode.data.name}] ${clickedNode.expanded ? 'EXPANDED' : 'COLLAPSED'}`,
            `QUERY: Fetching skill sub-modules under ${clickedNode.data.name}...`,
            ...prev.slice(0, 3)
          ]);
          setSelectedSkill(clickedNode.data);
        } else if (clickedNode.data.type === 'child') {
          // Log selected skill
          setTerminalLogs((prev) => [
            `LOG: Skill diagnostics loaded for node [${clickedNode.data.name}]`,
            `DIAGNOSTICS: Target proficiency at ${clickedNode.data.rating}%`,
            ...prev.slice(0, 3)
          ]);
          setSelectedSkill(clickedNode.data);
        } else if (clickedNode.data.type === 'core') {
          // Expand all categories
          const cats = nodes.filter(n => n.data.type === 'category');
          const allExpanded = cats.every(c => c.expanded);
          cats.forEach(c => c.expanded = !allExpanded);

          setTerminalLogs((prev) => [
            `LOG: Core node pulsed. ${allExpanded ? 'Collapsing' : 'Expanding'} all nodes.`,
            ...prev.slice(0, 3)
          ]);
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw nodes
      // Draw lines first so nodes sit on top of lines
      nodes.forEach((n) => n.update(mouse, centerX, centerY));
      nodes.forEach((n) => n.draw());

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = 550;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode]);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* View Mode Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => setViewMode('canvas')} 
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold border cursor-pointer transition-all duration-300 ${
            viewMode === 'canvas' 
              ? 'bg-slate-900 text-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(0,242,254,0.15)]' 
              : 'bg-transparent text-text-muted border-default hover:text-white'
          }`}
        >
          &lt;NEURAL_MAP_VIEW /&gt;
        </button>
        <button 
          onClick={() => setViewMode('inventory')} 
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold border cursor-pointer transition-all duration-300 ${
            viewMode === 'inventory' 
              ? 'bg-slate-900 text-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(0,242,254,0.15)]' 
              : 'bg-transparent text-text-muted border-default hover:text-white'
          }`}
        >
          &lt;GRID_INVENTORY_VIEW /&gt;
        </button>
      </div>

      {/* Render layouts */}
      {viewMode === 'canvas' ? (
        <div className="grid grid-cols-1 lg-grid-cols-3 gap-6 items-stretch">
          {/* Skill Diagnostic Console (Left Panel) */}
          <div className="lg-col-span-1 glass-panel cyan-card p-6 flex flex-col justify-between" style={{ minHeight: '350px' }}>
            <div>
              <div className="flex items-center justify-between border-b border-default pb-4 mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-primary font-sans">
                  <Cpu className="text-accent-cyan w-5 h-5 pulse-glow-violet" />
                  Skill Diagnostic Console
                </h3>
                <span className="text-10px text-accent-cyan font-mono border border-cyan px-2 py-1 rounded uppercase">
                  Online
                </span>
              </div>

              {selectedSkill ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-10px text-text-muted font-mono uppercase">Node Identifier</span>
                    <h4 className="text-2xl font-black text-white font-mono mt-0.5">{selectedSkill.name}</h4>
                  </div>

                  {selectedSkill.rating && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono mb-1">
                        <span className="text-text-muted">PROFICIENCY</span>
                        <span className="text-accent-cyan font-bold">{selectedSkill.rating}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-default">
                        <div 
                          className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${selectedSkill.rating}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-10px text-text-muted font-mono uppercase">Diagnostic Logs</span>
                    <p className="text-sm text-text-muted leading-relaxed mt-1 font-sans">
                      {selectedSkill.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <AlertCircle className="w-8 h-8 mx-auto opacity-30 mb-2" />
                  <p className="text-sm">No node selected. Click on a network node in the Skill Matrix.</p>
                </div>
              )}
            </div>

            {/* Console Log Sub-panel */}
            <div className="mt-6 border-t border-default pt-4 font-mono text-11px text-text-muted bg-slate-950-80 p-3 rounded border border-slate-900/50">
              <div className="flex items-center gap-1.5 mb-2 text-accent-cyan font-bold">
                <Terminal className="w-3-5 h-3-5" />
                <span>AGENT_TERMINAL.log</span>
              </div>
              <div className="space-y-1 overflow-y-auto" style={{ maxHeight: '110px' }}>
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith('LOG:') ? 'text-accent-violet' : log.startsWith('QUERY:') ? 'text-accent-green' : 'text-slate-400'}>
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Network Matrix Canvas (Right 2/3 Panel) */}
          <div className="lg-col-span-2 glass-panel violet-card relative flex flex-col justify-center overflow-hidden" style={{ minHeight: '450px' }}>
            <div className="absolute top-4 left-4 z-10 font-mono text-xs flex items-center gap-2 text-text-muted bg-slate-950-60 px-3 py-1-5 rounded-full border border-default">
              <GitBranch className="w-3-5 h-3-5 text-accent-violet" />
              <span>Interactive Neural Branching skill matrix</span>
            </div>
            
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-4 text-10px font-mono text-text-muted bg-slate-950-60 px-4 py-2 rounded border border-default">
              <span className="flex items-center gap-1"><span className="w-2-5 h-2-5 rounded-full bg-cyan-400"></span> GenAI</span>
              <span className="flex items-center gap-1"><span className="w-2-5 h-2-5 rounded-full bg-purple-600"></span> AI/ML</span>
              <span className="flex items-center gap-1"><span className="w-2-5 h-2-5 rounded-full bg-rose-500"></span> Backend</span>
              <span className="flex items-center gap-1"><span className="w-2-5 h-2-5 rounded-full bg-green-500"></span> Languages</span>
            </div>

            <canvas ref={canvasRef} className="w-full cursor-crosshair" style={{ height: '550px' }} />
          </div>
        </div>
      ) : (
        <div className="glass-panel violet-card p-8 grid grid-cols-1 md-grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest block mb-3">// AI/ML & DEEP LEARNING</span>
              <div className="flex flex-wrap gap-3">
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> PyTorch</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> TensorFlow</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> Scikit-Learn</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> LightGBM</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> YOLOv8 / OpenCV</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-accent-violet uppercase tracking-widest block mb-3">// GENAI & STATEFUL AGENTS</span>
              <div className="flex flex-wrap gap-3">
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-purple-500"></span> LangGraph</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-purple-500"></span> LangChain</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-purple-500"></span> RAG Memory</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-purple-500"></span> ChromaDB</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-purple-500"></span> LLM APIs (Gemini, Claude)</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-accent-coral uppercase tracking-widest block mb-3">// DEVELOPMENT LANGUAGES</span>
              <div className="flex flex-wrap gap-3">
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-rose-500"></span> Python</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-rose-500"></span> Java (DSA)</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-rose-500"></span> JavaScript</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-rose-500"></span> SQL</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-rose-500"></span> C Language</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-accent-green uppercase tracking-widest block mb-3">// BACKEND & MICROSERVICES</span>
              <div className="flex flex-wrap gap-3">
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-green-500"></span> FastAPI (Async)</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-green-500"></span> REST APIs</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-green-500"></span> MongoDB</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-green-500"></span> MySQL</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-green-500"></span> Node.js / Express</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest block mb-3">// DEVOPS, DEPLOYMENT & TOOLS</span>
              <div className="flex flex-wrap gap-3">
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> Docker Containers</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> Git / GitHub</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> Postman API Test</span>
                <span className="tech-capsule"><span className="w-2.5 h-2-5 rounded-full bg-cyan-400"></span> Vercel Deploy</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-xs text-text-muted leading-relaxed font-sans">
              <strong className="text-white block mb-1">Architectural Focus:</strong>
              Vivek specializes in building secure, sandboxed development environments, orchestrating multi-agent safety copilots via LangGraph state graphs, and training high-dimensional regressions on Amazon ML infrastructures.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTree;
