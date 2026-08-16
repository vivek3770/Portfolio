import React, { useState } from 'react';
import { Award, BookOpen, Calendar, ShieldCheck, ZoomIn, X, ExternalLink } from 'lucide-react';

const TIMELINE_DATA = [
  {
    id: 'drdo',
    category: 'achievement',
    title: 'DRDO & NIT Delhi Residency',
    subtitle: 'MLOps & Agentic AI for Defense Computing',
    date: '2025',
    desc: 'Completed a selective 5-day residency program on building production MLOps and autonomous Agentic AI architectures designed for critical defense computing infrastructure.',
    image: '/assets/cert2.png',
    verifyLink: '#'
  },
  {
    id: 'amazon_ml',
    category: 'achievement',
    title: 'Amazon ML Challenge 2025',
    subtitle: 'Top 20% National Rank (80,000+ competitors)',
    date: '2025',
    desc: 'Developed a high-performance multimodal product pricing regressor fusing text embeddings and image vectors, executing robust predictions under strict hardware constraints.',
    image: '/assets/amazon_ml_badge.jpg',
    verifyLink: '#'
  },
  {
    id: 'oracle',
    category: 'certification',
    title: 'Oracle Cloud Certified',
    subtitle: 'AI Foundations Associate',
    date: '2025',
    desc: 'Demonstrated proficiency in core Artificial Intelligence concepts, machine learning algorithms, deep learning models, and building cognitive workflows on Oracle Cloud Infrastructure.',
    image: '/assets/cert1.png',
    verifyLink: '#'
  },
  {
    id: 'infosys_oop',
    category: 'certification',
    title: 'Mastering OOPs with Python',
    subtitle: 'Infosys Springboard Certified',
    date: '2024',
    desc: 'Certified in Advanced Object-Oriented Programming principles, class models, inheritance structures, polymorphism, and functional code patterns using Python.',
    image: '/assets/cert3.png',
    verifyLink: '#'
  },
  {
    id: 'simplilearn_ml',
    category: 'certification',
    title: 'Machine Learning Specialist',
    subtitle: 'Simplilearn Certified AI Specialist',
    date: '2024',
    desc: 'Advanced training in predictive model ensembles, neural net configurations, text modeling pipelines, and deep learning implementations.',
    image: '/assets/cert4.png',
    verifyLink: '#'
  },
  {
    id: 'education',
    category: 'education',
    title: 'B.Tech in Computer Science',
    subtitle: 'Ajay Kumar Garg Engineering College (AKGEC)',
    date: '2023 - 2027',
    desc: 'Specializing in computer science topics, software engineering, databases, and core intelligence systems. Maintained a CGPA of 7.75/10.0.',
    icon: 'college'
  },
  {
    id: 'dsa',
    category: 'achievement',
    title: 'Competitive Programming Master',
    subtitle: '400+ Solved DSA Problems',
    date: 'Active',
    desc: 'Solved 400+ problems in Java across LeetCode & CodeChef. Top 10% rank in competitive coding contests. Solid expertise in algorithms, complexity analysis, and graph theory.'
  },
  {
    id: 'hackathons',
    category: 'achievement',
    title: 'Smart India Hackathon (SIH)',
    subtitle: 'Lead Hackathon Developer',
    date: 'Active',
    desc: 'Led cross-functional teams to build and ship production software systems, winning regional, university, and national rounds of hackathons.'
  }
];

const Timeline = () => {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  const openInspector = (item) => {
    setModalImage(item.image);
    setModalTitle(`${item.title} — ${item.subtitle}`);
    setModalDesc(item.desc);
  };

  const closeInspector = () => {
    setModalImage(null);
  };

  return (
    <div className="relative py-8">
      {/* Central Timeline Line */}
      <div className="absolute left-4 md-left-50 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-violet to-slate-900 pointer-events-none transform -translate-x-1/2" />

      <div className="space-y-12">
        {TIMELINE_DATA.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div 
              key={item.id} 
              className={`flex flex-col md-flex-row items-stretch w-full ${
                isLeft ? 'md-flex-row-reverse' : ''
              }`}
            >
              {/* Card Container (Left or Right depending on alignment) */}
              <div className="w-full md-w-50 px-4 md-px-8 flex justify-end md-justify-start">
                <div 
                  className={`w-full max-w-lg glass-panel p-5 relative overflow-hidden transition-all duration-300 ${
                    item.category === 'certification' 
                      ? 'violet-card hover:shadow-glow-violet' 
                      : 'cyan-card hover:shadow-glow-cyan'
                  }`}
                >
                  {/* Glowing vertical bar on edge */}
                  <div 
                    className={`absolute top-0 bottom-0 left-0 w-1 ${
                      item.category === 'certification' ? 'bg-accent-violet' : 'bg-accent-cyan'
                    }`} 
                  />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 pl-2">
                    <div>
                      <span className="text-10px font-mono text-text-muted uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <h4 className="text-lg font-black text-white font-sans mt-0.5">
                        {item.title}
                      </h4>
                      <h5 className="text-xs font-mono text-accent-cyan mt-0.5">
                        {item.subtitle}
                      </h5>
                    </div>
                    <span className="text-xs font-mono text-text-muted bg-slate-950 px-2 py-1 rounded border border-default flex items-center gap-1">
                      <Calendar className="w-3-5 h-3-5 text-accent-violet" />
                      {item.date}
                    </span>
                  </div>

                  {/* Body Content */}
                  <p className="text-text-muted text-sm pl-2 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Image/Photo section if available */}
                  {item.image && (
                    <div className="relative group cursor-pointer overflow-hidden rounded-lg border border-default bg-slate-950-40 p-2 mt-2">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-auto object-contain rounded-md filter brightness-90 group-hover:scale-102 group-hover:brightness-105 transition-all duration-500"
                        style={{ maxHeight: '220px' }}
                      />
                      {/* Holographic Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <button 
                          onClick={() => openInspector(item)}
                          className="btn-outline text-11px py-1-5 px-3 rounded-full flex items-center gap-1 font-mono hover:scale-105"
                        >
                          <ZoomIn className="w-3-5 h-3-5" />
                          Inspect Credential
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Verify link if available and no image */}
                  {!item.image && item.category === 'certification' && (
                    <div className="pl-2 mt-2">
                      <a 
                        href={item.verifyLink} 
                        className="text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Verify Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Center Badge */}
              <div className="absolute left-4 md-left-50 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-800 -translate-x-1/2">
                {item.category === 'education' ? (
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                ) : (
                  <Award className="w-4 h-4 text-accent-violet animate-pulse" />
                )}
              </div>

              {/* Spacer for large screens */}
              <div className="hidden md-block w-1/2" />
            </div>
          );
        })}
      </div>

      {/* Hologram Inspect Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
          <div className="glass-panel violet-card w-full max-w-xl relative overflow-hidden flex flex-col p-6 animate-[pulseGlow_0.5s_ease-out]">
            {/* Holographic light sweep lines */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,242,254,0.05)_0%,rgba(142,45,226,0.05)_100%)] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-default pb-4 mb-4">
              <h4 className="text-lg font-mono font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-accent-cyan w-5 h-5" />
                Credential Inspector
              </h4>
              <button 
                onClick={closeInspector}
                className="text-text-muted hover:text-white hover:bg-slate-900 p-1.5 rounded-lg border border-default cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tiltable badge in modal */}
            <div className="flex justify-center p-6 bg-slate-950-60 rounded-xl border border-default">
              <div className="hologram-card relative max-w-full rounded-2xl overflow-hidden border border-accent-cyan/30 shadow-[0_0_30px_rgba(0,242,254,0.15)] bg-slate-900 p-2" style={{ width: '320px' }}>
                <img 
                  src={modalImage} 
                  alt="Credential Badge" 
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="text-xl font-black text-white font-sans text-center">{modalTitle}</h3>
              <p className="text-text-muted text-sm text-center leading-relaxed font-sans px-4">
                {modalDesc}
              </p>
              <div className="pt-4 border-t border-default flex justify-center text-10px font-mono text-accent-cyan">
                <span>// DIGITAL CREDENTIAL VERIFIED SECURE // ID: VVK-2026-X8391</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
