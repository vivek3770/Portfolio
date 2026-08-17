import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import StarBackground from './components/StarBackground';
import Chatbot from './components/Chatbot';
import { Github, Linkedin } from './components/BrandIcons';

// ==========================================
// LINKS & SOCIAL CONSTANTS (from links.txt)
// ==========================================
const LINKS = {
  github: 'https://github.com/vivek3770',
  linkedin: 'https://www.linkedin.com/in/vivek-kumar-aieng/',
  leetcode: 'https://leetcode.com/u/Vivekk_01/',
  codechef: 'https://www.codechef.com/users/tower_resin_11',
  huggingface: 'https://huggingface.co/Monkey3770',
  codemind: 'https://github.com/vivek3770/CodeMind',
  safeops: 'https://github.com/SafeOps-AI-Org',
  multimodal: 'https://github.com/vivek3770/Amazon_ML_Challenge',
};

// Simple Icons CDN helper
const SI = (slug, hex = '94a3b8') => `https://cdn.simpleicons.org/${slug}/${hex}`;

// ==========================================
// DATA DEFINITIONS
// ==========================================

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    emoji: '⌨️',
    color: '#22d3ee',
    items: [
      { name: 'Python', icon: SI('python', '3776ab') },
      { name: 'Java', icon: SI('openjdk', 'ed8b00') },
      { name: 'JavaScript', icon: SI('javascript', 'f7df1e') },
      { name: 'C', icon: SI('c', 'a8b9cc') },
    ],
  },
  {
    label: 'AI / ML & Deep Learning',
    emoji: '🧠',
    color: '#a78bfa',
    items: [
      { name: 'PyTorch', icon: SI('pytorch', 'ee4c2c') },
      { name: 'TensorFlow', icon: SI('tensorflow', 'ff6f00') },
      { name: 'Scikit-Learn', icon: SI('scikitlearn', 'f7931e') },
      { name: 'LightGBM', icon: null },
      { name: 'OpenCV', icon: SI('opencv', '5c3ee8') },
      { name: 'Hugging Face', icon: SI('huggingface', 'ffd21e') },
    ],
  },
  {
    label: 'GenAI & Agents',
    emoji: '🤖',
    color: '#22d3ee',
    items: [
      { name: 'LangChain', icon: SI('langchain', '1c3c3c') },
      { name: 'LangGraph', icon: null },
      { name: 'ChromaDB', icon: null },
      { name: 'RAG Pipelines', icon: null },
      { name: 'Gemini API', icon: SI('google', '4285f4') },
      { name: 'Claude API', icon: SI('anthropic', 'cc9b7a') },
    ],
  },
  {
    label: 'Frontend',
    emoji: '🎨',
    color: '#4ade80',
    items: [
      { name: 'React', icon: SI('react', '61dafb') },
      { name: 'HTML5', icon: SI('html5', 'e34f26') },
      { name: 'CSS3', icon: SI('css3', '1572b6') },
    ],
  },
  {
    label: 'Backend & APIs',
    emoji: '⚡',
    color: '#e85d5d',
    items: [
      { name: 'FastAPI', icon: SI('fastapi', '009688') },
      { name: 'Node.js / Express (Familiar)', icon: SI('nodedotjs', '5fa04e') },
      { name: 'REST APIs', icon: null },
    ],
  },
  {
    label: 'Databases',
    emoji: '🗄️',
    color: '#f59e0b',
    items: [
      { name: 'MongoDB', icon: SI('mongodb', '47a248') },
      { name: 'MySQL', icon: SI('mysql', '4479a1') },
      { name: 'PostgreSQL', icon: SI('postgresql', '4169e1') },
    ],
  },
  {
    label: 'DevOps & Cloud',
    emoji: '🚀',
    color: '#22d3ee',
    items: [
      { name: 'Docker', icon: SI('docker', '2496ed') },
      { name: 'Git', icon: SI('git', 'f05032') },
      { name: 'GitHub', icon: SI('github', 'ffffff') },
      { name: 'Vercel', icon: SI('vercel', 'ffffff') },
      { name: 'Linux', icon: SI('linux', 'fcc624') },
      { name: 'Postman', icon: SI('postman', 'ff6c37') },
    ],
  },
];

const PROJECTS = [
  {
    number: '01',
    title: 'CodeMind IDE',
    subtitle: 'AI-Powered Full-Stack IDE',
    desc: 'An intelligent development environment with Docker-sandboxed code execution, LangGraph multi-agent autonomous debugger, and ChromaDB RAG documentation retrieval. The AI agent detects runtime errors and autonomously proposes + applies fixes.',
    tech: ['FastAPI', 'LangGraph', 'Docker', 'ChromaDB', 'React', 'MongoDB'],
    github: LINKS.codemind,
    accent: '#22d3ee',
    featured: true,
  },
  {
    number: '02',
    title: 'SafeOps AI',
    subtitle: 'Multi-Agent DevOps Security Copilot',
    desc: 'Autonomous AI copilot that monitors infrastructure logs in real-time, detects anomalies with YOLOv8, classifies threats via a LangGraph state graph, and auto-generates remediation shell commands.',
    tech: ['Python', 'LangGraph', 'YOLOv8', 'FastAPI', 'MongoDB', 'LangChain'],
    github: LINKS.safeops,
    accent: '#a78bfa',
  },
  {
    number: '03',
    title: 'Multimodal Price Predictor',
    subtitle: 'Amazon ML Challenge · Top 20%',
    desc: 'Dual-tower neural architecture fusing BERT text embeddings and ResNet image vectors. LightGBM ensemble achieved Top 20% among 80,000+ competitors.',
    tech: ['PyTorch', 'BERT', 'ResNet', 'LightGBM', 'Scikit-Learn'],
    github: LINKS.multimodal,
    accent: '#e85d5d',
  },
];

// Correct certificate mapping based on file sizes and names
const CERT_GROUPS = [
  {
    group: 'Cloud Certifications',
    certs: [
      {
        id: 'c4',
        title: 'Oracle Cloud Infrastructure Certified AI Foundations Associate',
        issuer: 'Oracle · 2025',
        image: '/assets/cert4.png',
      },
    ],
  },
  {
    group: 'Workshops & Residencies',
    certs: [
      {
        id: 'c_drdo',
        title: 'MLOps & Agentic AI Residency',
        issuer: 'DRDO & NIT Delhi · 2025',
        image: '/assets/drdo_mlops_badge.jpg',
      },
    ],
  },
  {
    group: 'Programming & AI Certifications',
    certs: [
      {
        id: 'c1',
        title: 'Mastering OOPs with Python',
        issuer: 'Infosys Springboard · 2024',
        image: '/assets/cert1.png',
      },
      {
        id: 'c2',
        title: 'Machine Learning Specialist',
        issuer: 'Simplilearn · 2024',
        image: '/assets/cert2.png',
      },
      {
        id: 'c3',
        title: 'Learn AI with TensorFlow',
        issuer: 'Infosys Springboard · 2024',
        image: '/assets/cert3.png',
      },
    ],
  },
];

// ==========================================
// HOOKS & UTILS
// ==========================================
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const useTypewriter = (texts, speed = 60, pause = 2400) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let t;
    if (!deleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
};

const Counter = ({ target, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const end = parseFloat(target);
        const step = end / 35;
        const t = setInterval(() => {
          s += step;
          if (s >= end) { setVal(target); clearInterval(t); }
          else setVal(Number.isInteger(end) ? Math.floor(s) : s.toFixed(2));
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ==========================================
// NAVIGATION
// ==========================================
const Nav = ({ scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo-icon">VK</div>
          Vivek Kumar
        </div>
        <ul className="nav-links">
          {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map(s => (
            <li key={s}>
              <a href={`#${s.toLowerCase()}`} onClick={e => { e.preventDefault(); scrollTo(s.toLowerCase()); }}>
                {s}
              </a>
            </li>
          ))}
        </ul>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline nav-cta">
          Hire Me ↗
        </a>
      </div>
    </nav>
  );
};

// ==========================================
// HERO
// ==========================================
const Hero = () => {
  const title = useTypewriter(['AI/ML Engineer', 'Agentic AI Developer', 'GenAI Builder', 'Problem Solver']);
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          {/* Text */}
          <div>
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              Available for opportunities
            </div>
            <h1 className="hero-name">
              Hi, I'm{' '}
              <span
                className="accent"
                style={{
                  background: 'linear-gradient(135deg, #e85d5d 0%, #f97316 50%, #e85d5d 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 4s linear infinite',
                  display: 'inline-block',
                }}
              >
                Vivek
              </span>
              <br />Kumar
            </h1>
            <p className="hero-title">{`> ${title}`}</p>
            <p className="hero-desc">
              Specializing in building intelligent AI systems — training deep learning models, orchestrating autonomous multi-agent pipelines, and shipping scalable backend services to production.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>

            {/* Social icons */}
            <div className="hero-socials">
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                <Github style={{ width: 18, height: 18 }} />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                <Linkedin style={{ width: 18, height: 18 }} />
              </a>
              <a href={LINKS.leetcode} target="_blank" rel="noreferrer" className="social-link" title="LeetCode">
                <img src={SI('leetcode', '22d3ee')} alt="LeetCode" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
              <a href={LINKS.codechef} target="_blank" rel="noreferrer" className="social-link" title="CodeChef">
                <img src={SI('codechef', '22d3ee')} alt="CodeChef" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
              <a href={LINKS.huggingface} target="_blank" rel="noreferrer" className="social-link" title="Hugging Face">
                <img src={SI('huggingface', 'ffd21e')} alt="Hugging Face" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
              <a href="mailto:vivekku9873@gmail.com" className="social-link" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Photo + badges */}
          <div className="hero-photo-wrapper">
            <div className="hero-photo-glow" />
            <div className="hero-photo-ring">
              <div className="hero-photo-inner">
                <img src="/assets/me.jpeg" alt="Vivek Kumar" />
              </div>
            </div>
            {/* floating stat badges */}
            <div className="hero-badge" style={{ bottom: '14px', left: '-40px' }}>
              <div className="hero-badge-val">400+</div>
              <div className="hero-badge-lbl">DSA Solved</div>
            </div>
            <div className="hero-badge" style={{ top: '20px', right: '-36px' }}>
              <div className="hero-badge-val" style={{ color: '#a78bfa' }}>Top 20%</div>
              <div className="hero-badge-lbl">Amazon ML</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ABOUT
// ==========================================
const About = () => {
  const stats = [
    { value: '400', suffix: '+', label: 'DSA Problems Solved' },
    { value: '5', suffix: '', label: 'Certifications' },
    { value: '3', suffix: '', label: 'Major Projects' },
    { value: '7.75', suffix: '', label: 'CGPA / 10.0' },
  ];
  const focuses = [
    { label: 'Agentic AI & Multi-Agent Systems', color: '#a78bfa' },
    { label: 'Deep Learning & Model Training', color: '#22d3ee' },
    { label: 'Scalable Backend & APIs', color: '#e85d5d' },
    { label: 'Problem Solving (Java DSA)', color: '#4ade80' },
  ];
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: 52 }}>
            Know <span>More</span>
          </h2>
        </div>
        <div className="about-grid">
          <div className="reveal-left">
            {/* Terminal Card */}
            <div className="terminal-card">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: '#ef4444' }} />
                <span className="terminal-dot" style={{ background: '#f59e0b' }} />
                <span className="terminal-dot" style={{ background: '#22c55e' }} />
                <span className="terminal-header-text">vivek.config</span>
              </div>
              <div className="terminal-body">
                <div><span className="comment">// who am I</span></div>
                <div><span className="key">name</span>: <span className="str">"Vivek Kumar"</span></div>
                <div><span className="key">role</span>: <span className="str">"AI/ML Engineer"</span></div>
                <div><span className="key">college</span>: <span className="str">"AKGEC, B.Tech CSE"</span></div>
                <div><span className="key">batch</span>: <span className="num">2023–2027</span></div>
                <div><span className="key">location</span>: <span className="str">"Delhi NCR, India"</span></div>
                <div><span className="key">openTo</span>: <span className="str">"Internships · Full-time · WFH · Freelance"</span></div>
              </div>
            </div>

            {/* Focus Pills */}
            <div className="focus-tags">
              {focuses.map(f => (
                <div key={f.label} className="focus-tag">
                  <span className="focus-dot" style={{ background: f.color, boxShadow: `0 0 8px ${f.color}` }} />
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="about-text reveal-right">
            <p>
              I'm <strong>Vivek Kumar</strong> — an AI/ML Engineer pursuing
              B.Tech in Computer Science at <strong>AKGEC, Ghaziabad</strong> (Class of 2027).
            </p>
            <p>
              I build <strong>end-to-end intelligent systems</strong> — from training transformer-based
              deep learning models to orchestrating stateful multi-agent pipelines with LangGraph,
              and architecting production-grade async backends with FastAPI and Docker.
            </p>
            <p>
              My recent work includes an <strong>AI-powered coding IDE</strong> with autonomous
              debugging agents, a <strong>multi-agent DevOps security copilot</strong>, and a
              <strong> multimodal price prediction system</strong> (Top 20%, Amazon ML Challenge,
              80,000+ teams).
            </p>
            <p>
              Beyond code, I'm a <strong>problem solver</strong> — 400+ DSA problems in Java across LeetCode & CodeChef,
              an ML research enthusiast, and someone who enjoys shipping things that actually
              go live in production.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 22px' }}>Get In Touch</a>
              <a href="#projects" className="btn btn-outline" style={{ fontSize: 13, padding: '10px 22px' }}>See Projects</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SKILLS
// ==========================================
const Skills = () => (
  <section className="section" id="skills">
    <div className="container">
      <div className="reveal" style={{ marginBottom: 60 }}>
        <div className="section-label">Tech Stack</div>
        <h2 className="section-title">
          Tools &amp; <span>Technologies</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15, marginTop: 10, fontFamily: 'var(--font-mono)' }}>
          // categorized by domain
        </p>
      </div>

      <div className="skills-wrap">
        {SKILL_CATEGORIES.map((cat, ci) => (
          <div key={cat.label} className="skill-category" style={{ animationDelay: `${ci * 0.07}s` }}>
            <div className="skill-cat-header">
              <div
                className="skill-cat-icon"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
              >
                {cat.emoji}
              </div>
              <span className="skill-cat-title" style={{ color: cat.color }}>
                {cat.label}
              </span>
              <div className="skill-cat-line" style={{ color: cat.color }} />
            </div>

            <div className="skill-chips">
              {cat.items.map(item => (
                <span key={item.name} className="skill-chip">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="skill-chip-img"
                      loading="lazy"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span
                      style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: cat.color, display: 'inline-block',
                      }}
                    />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// PROJECTS
// ==========================================
const Projects = () => (
  <section className="section" id="projects">
    <div className="container">
      <div className="reveal" style={{ marginBottom: 56 }}>
        <div className="section-label">Projects</div>
        <h2 className="section-title">Key <span>Architectures</span></h2>
        <p style={{ color: 'var(--muted)', fontSize: 15, marginTop: 10 }}>
          Production-grade systems built end-to-end — model training to deployment.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.number}
            className={`card card-corner project-card reveal reveal-delay-${i}`}
            style={{ borderTop: `2px solid ${p.accent}`, '--corner-color': p.accent }}
          >
            <div className="project-num">{p.number} / 03</div>
            <div>
              <div className="project-sub" style={{ color: p.accent }}>
                {p.subtitle}
              </div>
              <h3 className="project-title">{p.title}</h3>
            </div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-techs">
              {p.tech.map(t => (
                <span
                  key={t}
                  className="tech-tag"
                  style={{
                    borderColor: `${p.accent}35`,
                    color: p.accent,
                    background: `${p.accent}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
              <Github style={{ width: 15, height: 15 }} />
              View on GitHub
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// CERTIFICATES
// ==========================================
const Certificates = () => {
  const [active, setActive] = useState(null);
  return (
    <section className="section" id="certificates">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="section-label">Certificates</div>
          <h2 className="section-title">Verified <span>Credentials</span></h2>
        </div>

        {CERT_GROUPS.map((grp, gi) => (
          <div key={grp.group} className={`cert-section-group reveal reveal-delay-${gi}`}>
            <div className="cert-group-title">{grp.group}</div>
            <div className="cert-grid">
              {grp.certs.map((c, ci) => (
                <div
                  key={c.id}
                  className={`cert-card card reveal reveal-delay-${ci}`}
                  onClick={() => setActive(c)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActive(c)}
                >
                  <div className="cert-image-wrap">
                    <img src={c.image} alt={c.title} loading="lazy" />
                    <div className="cert-overlay">
                      <div className="cert-overlay-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="cert-info">
                    <div className="cert-title">{c.title}</div>
                    <div className="cert-issuer">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)}>×</button>
            <img src={active.image} alt={active.title} />
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16, color: 'var(--white)' }}>
                {active.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--coral)', marginTop: 4 }}>
                {active.issuer}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// CONTACT
// ==========================================
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setState('sending');
    setTimeout(() => { setState('sent'); setForm({ name: '', email: '', message: '' }); }, 1400);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="section-label">Contact</div>
          <h2 className="section-title">Get In <span>Touch</span></h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, marginTop: 10 }}>
            Have a project idea or want to collaborate? Let's talk.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal-left">
            <a href="mailto:vivekku9873@gmail.com" className="contact-info-item">
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="contact-text-label">Email</div>
                <div className="contact-text-value">vivekku9873@gmail.com</div>
              </div>
            </a>
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="contact-text-label">Location</div>
                <div className="contact-text-value">Delhi NCR, India</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div>
                <div className="contact-text-label">Open to</div>
                <div className="contact-text-value">Full-time · Freelance · Research</div>
              </div>
            </div>
            <div className="contact-socials">
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="social-link" title="GitHub"><Github style={{ width: 18, height: 18 }} /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><Linkedin style={{ width: 18, height: 18 }} /></a>
              <a href={LINKS.leetcode} target="_blank" rel="noreferrer" className="social-link" title="LeetCode">
                <img src={SI('leetcode', '22d3ee')} alt="LeetCode" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
              <a href={LINKS.codechef} target="_blank" rel="noreferrer" className="social-link" title="CodeChef">
                <img src={SI('codechef', '22d3ee')} alt="CodeChef" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
              <a href={LINKS.huggingface} target="_blank" rel="noreferrer" className="social-link" title="Hugging Face">
                <img src={SI('huggingface', 'ffd21e')} alt="Hugging Face" style={{ width: 18, height: 18 }} onError={e => e.target.style.display='none'} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            {state === 'sent' ? (
              <div className="card" style={{
                padding: 48, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 16, textAlign: 'center', minHeight: 300,
                borderColor: 'rgba(74,222,128,0.3)', boxShadow: '0 0 30px rgba(74,222,128,0.1)',
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: '50%',
                  background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#4ade80', fontSize: 30, fontWeight: 700,
                }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20 }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>Thanks for reaching out. Vivek will get back to you soon.</p>
                <button className="btn btn-outline" style={{ fontSize: 13 }} onClick={() => setState('idle')}>Send Another</button>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input name="name" value={form.name} onChange={onChange} className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} className="form-input" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" value={form.message} onChange={onChange} className="form-textarea" placeholder="Tell me about your project or idea..." rows={5} required />
                </div>
                <button type="submit" className="btn btn-coral" style={{ alignSelf: 'flex-start' }} disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// FOOTER
// ==========================================
const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-text">
        © 2026 <strong style={{ color: 'var(--white)' }}>Vivek Kumar</strong> — Built with React + Vite
      </div>
      <div className="footer-links">
        {['About', 'Skills', 'Projects', 'Certificates', 'Contact'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`}>{s}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ==========================================
// APP
// ==========================================
export default function App() {
  useReveal();
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <StarBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav scrollTo={scrollTo} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
