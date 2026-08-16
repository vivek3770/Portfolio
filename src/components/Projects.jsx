import React, { useState } from 'react';
import { Play, ArrowRight, Layers, Cpu, Server, Shield, Image as ImageIcon, FileText } from 'lucide-react';
import { Github } from './BrandIcons';

const PROJECTS = [
  {
    id: 'codemind',
    title: 'CodeMind – Full Stack Agentic IDE',
    subtitle: 'Autonomous AI Native Code Editor',
    tech: ['FastAPI', 'Gemini 2.5 Flash', 'CodeBERT', 'RAG', 'ChromaDB', 'React(Vite)', 'Docker'],
    desc: 'An AI-native developer environment leveraging LLMs for real-time code generation, auto-fixing, and security vulnerability scans. Runs user code inside secure Docker sandboxes and caches logs in ChromaDB.',
    github: 'https://github.com',
    simulatorTitle: 'IDE Agent Execution Loop'
  },
  {
    id: 'safeops',
    title: 'SafeOps AI – Multi-Agent Industrial Safety Platform',
    subtitle: 'Industrial Risk Monitoring & Response Copilot',
    tech: ['Python', 'FastAPI', 'LangGraph', 'PyTorch', 'YOLOv8', 'ChromaDB', 'OpenCV'],
    desc: 'Orchestrates 5 autonomous agents using LangGraph for real-time hazard detection. Employs a PyTorch LSTM autoencoder for anomaly forecasting and YOLOv8 for spatial conflict modeling.',
    github: 'https://github.com',
    simulatorTitle: 'LangGraph Multi-Agent Orchestration'
  },
  {
    id: 'pricepred',
    title: 'Multimodal Product Price Prediction',
    subtitle: 'Dual-Tower Regression Architecture',
    tech: ['PyTorch', 'LightGBM', 'DistilBERT', 'EfficientNet', 'Computer Vision'],
    desc: 'Designed a dual-tower architecture fusing text embeddings (DistilBERT) and image features (EfficientNet) on 75K+ Amazon products, scoring a competitive 57.45 SMAPE in Amazon ML Challenge.',
    github: 'https://github.com',
    simulatorTitle: 'Dual-Tower Fusion Flow'
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState('codemind');
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

  // CodeMind Simulation steps
  const runCodeMindSim = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStep(1);
    setSimLogs(['[IDE] User entered code with logical vulnerability.']);
    
    setTimeout(() => {
      setSimulationStep(2);
      setSimLogs(prev => [...prev, '[RAG Memory] Querying ChromaDB for past vulnerability reviews... Found 2 matches.']);
      
      setTimeout(() => {
        setSimulationStep(3);
        setSimLogs(prev => [...prev, '[LLM Core] Analyzing code syntax using CodeBERT & Gemini. Generating fix...']);
        
        setTimeout(() => {
          setSimulationStep(4);
          setSimLogs(prev => [...prev, '[Docker Sandbox] Spinning up sandbox container. Executing tests...']);
          
          setTimeout(() => {
            setSimulationStep(5);
            setSimLogs(prev => [...prev, '[Result] Tests passed! Code successfully patched. Sandboxed container destroyed.']);
            setSimulating(false);
          }, 1800);
        }, 1500);
      }, 1500);
    }, 1200);
  };

  // SafeOps Simulation steps
  const runSafeOpsSim = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStep(1);
    setSimLogs(['[Sensors] Vision camera feed loaded. Processing CCTV frame with YOLOv8...']);
    
    setTimeout(() => {
      setSimulationStep(2);
      setSimLogs(prev => [...prev, '[Forecast Agent] PyTorch LSTM detects thermal spike pattern. Anomaly likelihood: 87%.']);
      
      setTimeout(() => {
        setSimulationStep(3);
        setSimLogs(prev => [...prev, '[Risk Resolver] NetworkX graph analysis highlights simultaneous operational conflict.']);
        
        setTimeout(() => {
          setSimulationStep(4);
          setSimLogs(prev => [...prev, '[Compliance Agent] Querying OSHA standards. Drafting safety steps...']);
          
          setTimeout(() => {
            setSimulationStep(5);
            setSimLogs(prev => [...prev, '[Alert Action] FastAPI microservice triggers emergency ventilation. Alert dispatched.']);
            setSimulating(false);
          }, 1800);
        }, 1500);
      }, 1500);
    }, 1200);
  };

  // Multimodal Price Prediction flow
  const runPricePredSim = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStep(1);
    setSimLogs(['[Input] Loading Amazon product metadata, descriptions, and thumbnail images.']);
    
    setTimeout(() => {
      setSimulationStep(2);
      setSimLogs(prev => [...prev, '[Text Tower] Extracting title embeddings via DistilBERT. Shape: [Batch, 768]']);
      
      setTimeout(() => {
        setSimulationStep(3);
        setSimLogs(prev => [...prev, '[Vision Tower] Extracting feature vectors via EfficientNet. Shape: [Batch, 1280]']);
        
        setTimeout(() => {
          setSimulationStep(4);
          setSimLogs(prev => [...prev, '[Fusion Layer] Fusing text & visual vectors using multi-layer perceptron projection.']);
          
          setTimeout(() => {
            setSimulationStep(5);
            setSimLogs(prev => [...prev, '[LightGBM Model] Tree ensemble regressed. SmSMAPE score: 57.45. Output: $24.99']);
            setSimulating(false);
          }, 1800);
        }, 1500);
      }, 1500);
    }, 1200);
  };

  const handleSimStart = () => {
    if (activeProject === 'codemind') runCodeMindSim();
    if (activeProject === 'safeops') runSafeOpsSim();
    if (activeProject === 'pricepred') runPricePredSim();
  };

  return (
    <div className="space-y-8">
      {/* Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            onClick={() => {
              if (simulating) return;
              setActiveProject(proj.id);
              setSimulationStep(0);
              setSimLogs([]);
            }}
            disabled={simulating}
            className={`px-5 py-3 rounded-xl font-mono text-sm font-bold border transition-all duration-300 cursor-pointer ${
              activeProject === proj.id
                ? 'bg-slate-900 text-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                : 'bg-transparent text-text-muted border-default hover:text-white hover:border-slate-700'
            }`}
          >
            {proj.title.split(' – ')[0]}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      {PROJECTS.filter(p => p.id === activeProject).map((proj) => (
        <div key={proj.id} className="grid grid-cols-1 lg-grid-cols-5 gap-8 items-start">
          {/* Details Card (Left 2/5) */}
          <div className="lg-col-span-2 glass-panel cyan-card p-6 flex flex-col justify-between" style={{ minHeight: '480px' }}>
            <div>
              <div className="border-b border-default pb-4 mb-4">
                <span className="text-xs font-mono text-accent-cyan uppercase tracking-widest">{proj.subtitle}</span>
                <h3 className="text-2xl font-black text-white font-sans mt-1">{proj.title}</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6 font-sans">
                {proj.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono text-white bg-slate-950 border border-default px-2-5 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleSimStart}
                disabled={simulating}
                className="btn-primary w-full justify-center gap-2 cursor-pointer font-mono"
              >
                <Play className={`w-4 h-4 ${simulating ? 'animate-pulse' : ''}`} />
                {simulating ? 'Simulating...' : 'Run Architecture Demo'}
              </button>
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-outline px-4 flex items-center justify-center"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Interactive Flow Simulator Panel (Right 3/5) */}
          <div className="lg-col-span-3 glass-panel violet-card p-6 flex flex-col justify-between relative overflow-hidden" style={{ minHeight: '480px' }}>
            {/* Background cyber grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(142,45,226,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-default pb-4 mb-6">
                <h4 className="text-md font-mono font-bold text-white flex items-center gap-2">
                  <Layers className="text-accent-violet w-4 h-4" />
                  {proj.simulatorTitle}
                </h4>
                <span className="text-10px font-mono text-text-muted">
                  Interactive Node Execution
                </span>
              </div>

              {/* CodeMind IDE Interactive Graphic */}
              {activeProject === 'codemind' && (
                <div className="grid grid-cols-5 gap-3 items-center py-6 relative text-center">
                  {/* Flow Arrow Connectors (absolute) */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none px-8">
                    {[1, 2, 3, 4].map(i => (
                      <ArrowRight 
                        key={i} 
                        className={`w-4 h-4 text-slate-800 transition-colors duration-500 ${
                          simulationStep >= i ? 'text-accent-cyan animate-pulse' : ''
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Flow Steps */}
                  <div className={`col-span-1 p-3 rounded-lg border text-center transition-all duration-500 z-10 ${
                    simulationStep === 1 ? 'bg-slate-900 border-accent-cyan scale-105 shadow-glow-cyan' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <FileText className="w-5 h-5 mx-auto mb-1-5 text-accent-cyan" />
                    <span className="text-10px font-mono text-white block">1. Input</span>
                  </div>

                  <div className={`col-span-1 p-3 rounded-lg border text-center transition-all duration-500 z-10 ${
                    simulationStep === 2 ? 'bg-slate-900 border-accent-cyan scale-105 shadow-glow-cyan' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <Layers className="w-5 h-5 mx-auto mb-1-5 text-accent-violet" />
                    <span className="text-10px font-mono text-white block">2. RAG Context</span>
                  </div>

                  <div className={`col-span-1 p-3 rounded-lg border text-center transition-all duration-500 z-10 ${
                    simulationStep === 3 ? 'bg-slate-900 border-accent-cyan scale-105 shadow-glow-cyan' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <Cpu className="w-5 h-5 mx-auto mb-1-5 text-accent-magenta" />
                    <span className="text-10px font-mono text-white block">3. LLM Gen</span>
                  </div>

                  <div className={`col-span-1 p-3 rounded-lg border text-center transition-all duration-500 z-10 ${
                    simulationStep === 4 ? 'bg-slate-900 border-accent-cyan scale-105 shadow-glow-cyan' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <Server className="w-5 h-5 mx-auto mb-1-5 text-accent-green" />
                    <span className="text-10px font-mono text-white block">4. Docker Test</span>
                  </div>

                  <div className={`col-span-1 p-3 rounded-lg border text-center transition-all duration-500 z-10 ${
                    simulationStep === 5 ? 'bg-slate-900 border-green-500 scale-105 shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <Shield className="w-5 h-5 mx-auto mb-1-5 text-green-400" />
                    <span className="text-10px font-mono text-white block">5. Patch</span>
                  </div>
                </div>
              )}

              {/* SafeOps AI Multi-Agent Graphic */}
              {activeProject === 'safeops' && (
                <div className="relative py-8 flex items-center justify-center" style={{ height: '160px' }}>
                  <div className="absolute border border-dashed border-slate-900 rounded-full animate-spin-slow pointer-events-none" style={{ width: '240px', height: '240px' }} />
                  
                  {/* Central Node */}
                  <div className="absolute z-20 bg-slate-950 border border-accent-violet w-14 h-14 rounded-full flex items-center justify-center shadow-glow-violet">
                    <Cpu className="w-6 h-6 text-accent-violet" />
                  </div>

                  {/* 5 surrounding agents */}
                  {[
                    { name: 'Vision AI', step: 1, color: '#00f2fe', style: { top: '4px', right: '96px' } },
                    { name: 'Predictor', step: 2, color: '#8e2de2', style: { top: '56px', right: '8px' } },
                    { name: 'Risk Graph', step: 3, color: '#ff007f', style: { bottom: '16px', right: '40px' } },
                    { name: 'Compliance', step: 4, color: '#39ff14', style: { bottom: '16px', left: '40px' } },
                    { name: 'Alert API', step: 5, color: '#ff9f00', style: { top: '56px', left: '8px' } }
                  ].map((ag, idx) => {
                    const active = simulationStep === ag.step;
                    return (
                      <div 
                        key={idx} 
                        className={`absolute px-2-5 py-1-5 rounded border transition-all duration-500 font-mono text-9px text-white z-10 ${
                          active 
                            ? 'bg-slate-900 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.15)]' 
                            : 'bg-slate-950-80 border-default opacity-70'
                        }`}
                        style={{ ...ag.style, borderColor: active ? ag.color : 'rgba(255,255,255,0.06)' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ backgroundColor: ag.color }} />
                        {ag.name}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Multimodal Product Price Prediction Graphic */}
              {activeProject === 'pricepred' && (
                <div className="grid grid-cols-3 gap-6 items-center py-6 relative text-center">
                  {/* Text Tower */}
                  <div className={`p-4 rounded-xl border transition-all duration-500 ${
                    simulationStep >= 2 ? 'bg-slate-900 border-accent-cyan shadow-glow-cyan' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <FileText className="w-6 h-6 mx-auto mb-2 text-accent-cyan" />
                    <h5 className="text-xs font-mono text-white font-bold">Text Tower</h5>
                    <span className="text-9px text-text-muted font-mono block mt-1">DistilBERT Embeddings</span>
                  </div>

                  {/* Image Tower */}
                  <div className={`p-4 rounded-xl border transition-all duration-500 ${
                    simulationStep >= 3 ? 'bg-slate-900 border-accent-violet shadow-glow-violet' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 text-accent-violet" />
                    <h5 className="text-xs font-mono text-white font-bold">Image Tower</h5>
                    <span className="text-9px text-text-muted font-mono block mt-1">EfficientNet Vectors</span>
                  </div>

                  {/* Fusion Pipeline */}
                  <div className={`p-4 rounded-xl border transition-all duration-500 ${
                    simulationStep >= 4 ? 'bg-slate-900 border-accent-magenta shadow-[0_0_15px_rgba(255,0,127,0.25)]' : 'bg-slate-950 border-default opacity-60'
                  }`}>
                    <Layers className="w-6 h-6 mx-auto mb-2 text-accent-magenta" />
                    <h5 className="text-xs font-mono text-white font-bold">Vector Fusion</h5>
                    <span className="text-9px text-text-muted font-mono block mt-1">LightGBM Regression</span>
                  </div>
                </div>
              )}
            </div>

            {/* Execution Logger Console Output */}
            <div className="mt-8 border border-default rounded-xl bg-slate-950 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-10px text-text-muted border-b border-slate-900 pb-2 mb-2">
                <span>SIMULATION LOGGER CONSOLE</span>
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              </div>
              <div className="space-y-1.5 overflow-y-auto" style={{ height: '100px' }}>
                {simLogs.length > 0 ? (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-300 leading-relaxed">
                      <span className="text-accent-cyan mr-1.5">&gt;</span> {log}
                    </div>
                  ))
                ) : (
                  <div className="text-text-muted text-center py-6">
                    [System idle] Click "Run Architecture Demo" to execute model simulation steps.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
