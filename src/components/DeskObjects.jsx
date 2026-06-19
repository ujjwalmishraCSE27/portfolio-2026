import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_ICONS } from './TechIcons';

// Common sketch shadow definition
const SketchShadow = () => (
  <filter id="sketch-shadow" x="-10%" y="-10%" width="120%" height="120%">
    <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="#000000" floodOpacity="0.3" />
  </filter>
);

const LAPTOP_COMMANDS = [
  "npm init frontend",
  "install react next tailwind html css",
  "> HTML5 & CSS3 Loaded.",
  "> React.js Virtual DOM Active.",
  "> Next.js server-side features: READY.",
  "Frontend Environment: READY."
];

// 1. LAPTOP FRONTEND WORKSPACE
export const LaptopFrontend = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [typedLines, setTypedLines] = useState([]);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setTypedLines([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    let active = true;
    const typeNextLine = (idx) => {
      if (!active || idx >= LAPTOP_COMMANDS.length) return;
      setTypedLines(prev => [...prev, LAPTOP_COMMANDS[idx]]);
      setTimeout(() => typeNextLine(idx + 1), 450);
    };

    typeNextLine(0);

    return () => {
      active = false;
    };
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      {/* Hand-drawn Annotation */}
      <div className="absolute -top-7 left-2 font-cabin text-[10px] sm:text-xs text-neutral-400 tracking-wider rotate-[-2deg] pointer-events-none whitespace-nowrap">
        ✏️ Used in JanaDesh & NagarSetu
      </div>

      <svg viewBox="0 0 240 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Laptop Screen Body Frame - Space Gray */}
        <path 
          d="M 40,30 L 200,30 C 202,30 204,32 204,34 L 204,120 C 204,122 202,124 200,124 L 40,124 C 38,124 36,122 36,120 L 36,34 C 36,32 38,30 40,30 Z" 
          filter="url(#sketch-shadow)"
          fill="#334155"
        />
        
        {/* Double hand-drawn screen line */}
        <path d="M 38,32 L 202,32 C 203,32 203,33 203,34 L 203,122 L 37,122 L 37,34 C 37,33 37,32 38,32 Z" opacity="0.2" stroke="#475569" />
        
        {/* Screen Bezel inner line - Slate Black */}
        <rect x="42" y="36" width="156" height="82" fill="#0f172a" strokeWidth="1" stroke="#334155" />

        {/* Camera */}
        <circle cx="120" cy="33" r="1.5" fill="#64748b" stroke="none" />

        {/* Screen Reflection Doodles */}
        <line x1="180" y1="40" x2="195" y2="55" opacity="0.1" stroke="#94a3b8" />
        <line x1="185" y1="40" x2="195" y2="50" opacity="0.1" stroke="#94a3b8" />

        {/* Laptop Base Hinge */}
        <path d="M 90,124 L 150,124 L 146,128 L 94,128 Z" fill="#1e293b" stroke="#334155" />

        {/* Laptop Keyboard Base Body - Space Gray contrast */}
        <path 
          d="M 20,128 L 220,128 C 224,128 226,131 224,134 L 214,152 C 213,154 210,156 207,156 L 33,156 C 30,156 27,154 26,152 L 16,134 C 14,131 16,128 20,128 Z"
          fill="#1e293b"
          stroke="#475569"
        />
        {/* Base outline double line */}
        <path d="M 18,130 L 222,130 C 223,130 224,131 223,132 L 213,152 L 27,152 L 17,132 Z" opacity="0.2" strokeWidth="1" stroke="#64748b" />

        {/* Keyboard Area Grid Layout sketch */}
        <path d="M 38,134 L 202,134 L 195,146 L 45,146 Z" strokeWidth="1" stroke="#475569" fill="#0f172a" opacity="0.8" />
        
        {/* Keyboard keys horizontal sketches */}
        <line x1="42" y1="137" x2="198" y2="137" strokeWidth="1" stroke="#334155" opacity="0.5" />
        <line x1="45" y1="141" x2="195" y2="141" strokeWidth="1" stroke="#334155" opacity="0.5" />

        {/* Trackpad */}
        <path d="M 105,148 L 135,148 L 133,154 L 107,154 Z" strokeWidth="1" stroke="#475569" fill="#0f172a" />

        {/* Status indicator LED */}
        <circle cx="212" cy="151" r="1.2" fill={isHovered ? "#00F2FE" : "#64748b"} stroke="none" className={isHovered ? "animate-pulse" : ""} />
      </svg>

      {/* Terminal Screen Text Overlay - Rich dark blue background */}
      <div className="absolute top-[40px] left-[46px] w-[148px] h-[82px] p-2 flex flex-col justify-start font-spacemono text-[7px] text-left text-neutral-300 leading-snug overflow-hidden pointer-events-none select-none rounded-[2px]" style={{ backgroundColor: '#0b0f19' }}>
        {!isHovered ? (
          <div className="text-neutral-500 uppercase tracking-wider text-center mt-5 animate-pulse">
            &gt; Hover to Boot &lt;
            <div className="text-[6px] text-neutral-600 mt-1 lowercase">initializing frontend...</div>
          </div>
        ) : (
          <div className="space-y-0.5">
            {typedLines.map((line, idx) => (
              <div 
                key={idx} 
                className={`${
                  line.startsWith('>') ? 'text-[#00F2FE]' : 
                  line.startsWith('Frontend') ? 'text-emerald-400 font-bold' : 
                  'text-neutral-300'
                }`}
              >
                {line.startsWith('>') || line.startsWith('Frontend') ? '' : '$ '}{line}
              </div>
            ))}
            {typedLines.length < LAPTOP_COMMANDS.length && (
              <span className="inline-block w-1 h-2 bg-[#00F2FE] animate-cursor-blink ml-0.5" />
            )}
          </div>
        )}
      </div>

      {/* Pop-up Box displaying Frontend Skills - Colored with SVG logos */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="laptop-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[30px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#00f2fe] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(0,242,254,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#00f2fe] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              💻 Frontend
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["HTML"]} <span>HTML</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["CSS"]} <span>CSS</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Tailwind CSS"]} <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["React.js"]} <span>React.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Next.js"]} <span>Next.js</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 2. NOTEBOOK LANGUAGES
export const NotebookLanguages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none perspective-1000 desk-sketch-wiggle transition-all duration-300"
    >
      {/* 3D Flipping Notebook Container */}
      <div 
        className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out"
        style={{
          transform: isOpen ? 'rotateY(-28deg) rotateX(8deg)' : 'rotateY(0deg) rotateX(0deg)'
        }}
      >
        <svg viewBox="0 0 200 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <SketchShadow />
          </defs>

          {/* Book Spine Rings - Silver Metal */}
          <g strokeWidth="1.8" stroke="#94a3b8" className="relative z-10">
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 35 + i * 15;
              return (
                <g key={i}>
                  <path d={`M 25,${y} C 20,${y-3} 20,${y+3} 25,${y}`} />
                  <path d={`M 25,${y} L 31,${y}`} opacity="0.6" stroke="#cbd5e1" />
                </g>
              );
            })}
          </g>

          {/* Background / Back Cover page - Crimson Leather Cover */}
          <path 
            d="M 30,22 L 180,22 C 182,22 184,24 184,26 L 184,162 C 184,164 182,166 180,166 L 30,166 Z" 
            fill="#7f1d1d" 
            stroke="#991b1b"
            filter="url(#sketch-shadow)"
          />

          {/* Flippable Pages */}
          {!isOpen ? (
            // Closed Cover View
            <g className="backface-hidden">
              <path d="M 30,24 L 178,24 C 180,24 181,25 181,27 L 181,160 L 30,160 Z" fill="#991b1b" stroke="#b91c1c" />
              
              {/* Cover lines & designs - Gold details */}
              <rect x="42" y="38" width="126" height="108" strokeWidth="1" strokeDasharray="3 3" stroke="#f59e0b" opacity="0.5" />
              
              {/* Label Plate - Dark Leather Plate */}
              <path d="M 54,70 L 156,70 L 156,110 L 54,110 Z" fill="#450a0a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="105" y="86" textAnchor="middle" fill="#fef08a" className="font-cabin text-[10px] font-bold tracking-widest uppercase" stroke="none">PROGRAMMING</text>
              <text x="105" y="99" textAnchor="middle" fill="#fef08a" className="font-cabin text-[8px] font-semibold tracking-wider uppercase" stroke="none">FUNDAMENTALS</text>
              
              {/* Decorative gold star */}
              <path d="M 105,48 L 107,52 L 111,52 L 108,55 L 110,59 L 105,56 L 100,59 L 102,55 L 99,52 L 103,52 Z" strokeWidth="1" fill="#f59e0b" stroke="none" opacity="0.9" />
            </g>
          ) : (
            // Opened Pages View
            <g className="backface-hidden">
              {/* Left page - Ruled paper color */}
              <path d="M 30,24 L 30,160 L 103,160 L 103,24 Z" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.2" />
              
              {/* Notebook ruled lines left */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1="36" y1={38 + i * 14} x2="98" y2={38 + i * 14} strokeWidth="0.8" stroke="#d6d3d1" />
              ))}
              {/* Red margin line */}
              <line x1="48" y1="24" x2="48" y2="160" strokeWidth="0.8" stroke="#fca5a5" />

              {/* Right page */}
              <path d="M 103,24 L 178,24 L 178,160 L 103,160 Z" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.2" />
              {/* Ruled lines right */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={i} x1="108" y1={38 + i * 14} x2="172" y2={38 + i * 14} strokeWidth="0.8" stroke="#d6d3d1" />
              ))}
              {/* Red margin line right */}
              <line x1="160" y1="24" x2="160" y2="160" strokeWidth="0.8" stroke="#fca5a5" />
            </g>
          )}
        </svg>

        {/* Opened page text details overlaid */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="notebook-page-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute inset-0 flex p-3 text-neutral-800 leading-normal pointer-events-none select-none"
            >
              {/* Left Ruled Page (Doodles & Notes) */}
              <div className="w-1/2 pr-1 pt-6 text-[8px] font-cabin font-bold text-neutral-500 text-left pl-7 leading-relaxed">
                <div>// Core languages</div>
                <div className="mt-2 text-neutral-600 font-semibold font-space">// Competent in data structures & algorithms (300+ LeetCode)</div>
                <div className="mt-4 border-t border-neutral-200 pt-1.5 text-neutral-500">Python is preferred for scripting & AI integrations.</div>
              </div>

              {/* Right Ruled Page */}
              <div className="w-1/2 pl-3 pt-5 text-left pr-4">
                <h4 className="font-cabin text-[10px] font-bold text-neutral-900 border-b border-dashed border-neutral-300 pb-0.5 tracking-wider uppercase">Languages:</h4>
                <ul className="mt-2.5 font-spacemono text-[9px] font-bold text-neutral-800 space-y-2 uppercase leading-none">
                  <motion.li initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-1.5">
                    <span>• Java ☕</span>
                  </motion.li>
                  <motion.li initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-1.5">
                    <span>• Python 🐍</span>
                  </motion.li>
                  <motion.li initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-1.5">
                    <span>• JavaScript</span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pop-up Box displaying Languages Skills */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="notebook-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[10px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#ffeaa7] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(255,234,167,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#ffeaa7] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              📔 Languages
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Java"]} <span>Java</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Python"]} <span>Python</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["JavaScript"]} <span>JavaScript</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3. SERVER RACK BACKEND
export const ServerRackBackend = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      <svg viewBox="0 0 200 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Server Rack Body Chassis - Steel Blue Metallic */}
        <rect 
          x="35" 
          y="25" 
          width="130" 
          height="134" 
          rx="8" 
          fill="#334155" 
          stroke="#475569"
          filter="url(#sketch-shadow)" 
        />
        {/* Chassis inner borders */}
        <rect x="40" y="30" width="120" height="124" rx="4" strokeWidth="1" stroke="#475569" fill="#1e293b" />

        {/* Server Unit 1 */}
        <rect x="46" y="38" width="108" height="26" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
        <line x1="56" y1="51" x2="114" y2="51" strokeWidth="1" strokeDasharray="3 3" stroke="#475569" opacity="0.6" />
        <circle cx="132" cy="51" r="2.5" fill={isOpen ? "#10b981" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ color: "#10b981" }} />
        <circle cx="142" cy="51" r="2.5" fill={isOpen ? "#06b6d4" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ animationDelay: '0.4s', color: "#06b6d4" }} />
        <text x="56" y="47" fill="#64748b" className="font-spacemono text-[6px]" stroke="none">U1_NODE</text>

        {/* Server Unit 2 */}
        <rect x="46" y="72" width="108" height="26" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
        <line x1="56" y1="85" x2="114" y2="85" strokeWidth="1" strokeDasharray="3 3" stroke="#475569" opacity="0.6" />
        <circle cx="132" cy="85" r="2.5" fill={isOpen ? "#ef4444" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ animationDelay: '0.2s', color: "#ef4444" }} />
        <circle cx="142" cy="85" r="2.5" fill={isOpen ? "#10b981" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ animationDelay: '0.6s', color: "#10b981" }} />
        <text x="56" y="81" fill="#64748b" className="font-spacemono text-[6px]" stroke="none">U2_EXPR</text>

        {/* Server Unit 3 */}
        <rect x="46" y="106" width="108" height="26" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
        <line x1="56" y1="119" x2="114" y2="119" strokeWidth="1" strokeDasharray="3 3" stroke="#475569" opacity="0.6" />
        <circle cx="132" cy="119" r="2.5" fill={isOpen ? "#8b5cf6" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ animationDelay: '0.8s', color: "#8b5cf6" }} />
        <circle cx="142" cy="119" r="2.5" fill={isOpen ? "#f59e0b" : "#475569"} stroke="none" className={isOpen ? "animate-led" : ""} style={{ animationDelay: '0.3s', color: "#f59e0b" }} />
        <text x="56" y="115" fill="#64748b" className="font-spacemono text-[6px]" stroke="none">U3_REST</text>

        {/* Cabling drawings on server - Colored cables */}
        <path d="M 48,51 Q 38,75 48,119" stroke="#ef4444" opacity="0.4" strokeWidth="1" />
        <path d="M 152,51 Q 162,80 152,119" stroke="#3b82f6" opacity="0.4" strokeWidth="1" />

        {/* 3D Glass Swinging Cabinet Door overlay */}
        <g 
          className="transition-transform duration-700 ease-out origin-left"
          style={{
            transform: isOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Glass Door Outline */}
          <rect 
            x="40" 
            y="30" 
            width="120" 
            height="124" 
            rx="4" 
            fill="rgba(255,255,255,0.04)" 
            stroke="#94a3b8" 
            strokeWidth="1.5" 
          />
          {/* Door Handle */}
          <path d="M 152,82 L 152,98" stroke="#cbd5e1" strokeWidth="2" />
          {/* Diagonal Glass Reflection lines */}
          <line x1="60" y1="40" x2="140" y2="120" strokeWidth="1" stroke="#ffffff" opacity="0.08" />
          <line x1="80" y1="40" x2="145" y2="105" strokeWidth="1" stroke="#ffffff" opacity="0.08" />
        </g>
      </svg>

      {/* Pop-up Box displaying Backend Skills - Colored with SVG logos */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="server-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[10px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#a29bfe] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(162,155,254,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#a29bfe] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              ⚙️ Backend
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Node.js"]} <span>Node.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Express.js"]} <span>Express.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["REST APIs"]} <span>REST APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["JWT Authentication"]} <span>JWT Auth</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["MVC Architecture"]} <span>MVC Architecture</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. DATABASE SHELF
export const DatabaseShelf = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      <svg viewBox="0 0 200 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Database Rack Shelf Box - Sleek Tech Light Grey Cabinet */}
        <path 
          d="M 40,25 L 160,25 C 162,25 164,27 164,29 L 164,151 C 164,153 162,155 160,155 L 40,155 C 38,155 36,153 36,151 L 36,29 C 36,27 38,25 40,25 Z" 
          fill="#f1f5f9" 
          stroke="#1e293b"
          filter="url(#sketch-shadow)" 
        />
        {/* Ruled back shelf lines - Sleek styling */}
        <line x1="36" y1="68" x2="164" y2="68" stroke="#1e293b" strokeWidth="1.5" />
        <line x1="36" y1="112" x2="164" y2="112" stroke="#1e293b" strokeWidth="1.5" />

        {/* Stack 3: Bottom Database Stack Cylinder - PostgreSQL Blue */}
        <g 
          className="transition-transform duration-500 ease-out" 
          style={{ transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)' }}
        >
          <path d="M 60,118 C 60,113 140,113 140,118 L 140,136 C 140,141 60,141 60,136 Z" fill="#1d3557" stroke="#457b9d" />
          <ellipse cx="100" cy="118" rx="40" ry="5" fill="#457b9d" stroke="#a8dadc" />
          <line x1="70" y1="126" x2="130" y2="126" opacity="0.4" strokeWidth="1" stroke="#a8dadc" />
          <circle cx="100" cy="132" r="1.5" fill={isHovered ? "#3ecf8e" : "#555"} stroke="none" />
          <text x="100" y="123" textAnchor="middle" fill="#a8dadc" className="font-spacemono text-[5px] font-bold" stroke="none">MYSQL/PG</text>
        </g>

        {/* Stack 2: Middle Database Stack Cylinder - MongoDB Green */}
        <g 
          className="transition-transform duration-500 ease-out" 
          style={{ transform: isHovered ? 'translateY(-24px)' : 'translateY(0px)', transitionDelay: '0.05s' }}
        >
          <path d="M 60,74 C 60,69 140,69 140,74 L 140,92 C 140,97 60,97 60,92 Z" fill="#14532d" stroke="#166534" />
          <ellipse cx="100" cy="74" rx="40" ry="5" fill="#166534" stroke="#4ade80" />
          <line x1="70" y1="82" x2="130" y2="82" opacity="0.4" strokeWidth="1" stroke="#4ade80" />
          <circle cx="100" cy="88" r="1.5" fill={isHovered ? "#3ecf8e" : "#555"} stroke="none" />
          <text x="100" y="79" textAnchor="middle" fill="#4ade80" className="font-spacemono text-[5px] font-bold" stroke="none">MONGO/MONGOOSE</text>
        </g>

        {/* Stack 1: Top Database Stack Cylinder - Supabase Orange */}
        <g 
          className="transition-transform duration-500 ease-out" 
          style={{ transform: isHovered ? 'translateY(-36px)' : 'translateY(0px)', transitionDelay: '0.1s' }}
        >
          <path d="M 60,30 C 60,25 140,25 140,30 L 140,48 C 140,53 60,53 60,48 Z" fill="#7c2d12" stroke="#9a3412" />
          <ellipse cx="100" cy="30" rx="40" ry="5" fill="#9a3412" stroke="#ea580c" />
          <line x1="70" y1="38" x2="130" y2="38" opacity="0.4" strokeWidth="1" stroke="#ea580c" />
          <circle cx="100" cy="44" r="1.5" fill={isHovered ? "#3ecf8e" : "#555"} stroke="none" />
          <text x="100" y="35" textAnchor="middle" fill="#ea580c" className="font-spacemono text-[5px] font-bold" stroke="none">SUPABASE</text>
        </g>
      </svg>

      {/* Pop-up Box displaying Database Skills - Colored with SVG logos */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="database-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[10px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#3ecf8e] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(62,207,142,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#3ecf8e] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              🗄️ Database
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["MongoDB"]} <span>MongoDB</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Mongoose"]} <span>Mongoose</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["MySQL"]} <span>MySQL</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["PostgreSQL (Supabase)"]} <span>PostgreSQL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 5. DEVELOPER TOOLBOX
export const DeveloperToolbox = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      <svg viewBox="0 0 200 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Toolbox Main Outer Body Case - Industrial Metal Red */}
        <rect 
          x="35" 
          y="35" 
          width="130" 
          height="114" 
          rx="6" 
          fill="#991b1b" 
          stroke="#b91c1c"
          filter="url(#sketch-shadow)" 
        />
        {/* Double hand-drawn panel border */}
        <rect x="40" y="40" width="120" height="104" rx="4" strokeWidth="1" stroke="#b91c1c" opacity="0.3" fill="none" />

        {/* Top Handle of Toolbox - Silver Chrome */}
        <path d="M 75,35 C 75,25 125,25 125,35" stroke="#cbd5e1" strokeWidth="2.5" />
        <line x1="85" y1="35" x2="115" y2="35" stroke="#94a3b8" strokeWidth="2.5" opacity="0.6" />

        {/* Drawer 1 - Silver drawers */}
        <g 
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'translateY(-10px) translateX(6px)' : 'translateY(0) translateX(0)' }}
        >
          <rect x="46" y="48" width="108" height="24" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="85" y1="60" x2="115" y2="60" stroke="#64748b" strokeWidth="2.5" />
          <text x="56" y="58" fill="#475569" className="font-spacemono text-[5px]" stroke="none">DRW_01</text>
        </g>

        {/* Drawer 2 */}
        <g 
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'translateY(-4px) translateX(12px)' : 'translateY(0) translateX(0)', transitionDelay: '0.05s' }}
        >
          <rect x="46" y="78" width="108" height="24" rx="3" fill="#94a3b8" stroke="#64748b" strokeWidth="1.2" />
          <line x1="85" y1="90" x2="115" y2="90" stroke="#475569" strokeWidth="2.5" />
          <text x="56" y="88" fill="#334155" className="font-spacemono text-[5px]" stroke="none">DRW_02</text>
        </g>

        {/* Drawer 3 */}
        <g 
          className="transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'translateY(2px) translateX(18px)' : 'translateY(0) translateX(0)', transitionDelay: '0.1s' }}
        >
          <rect x="46" y="108" width="108" height="24" rx="3" fill="#64748b" stroke="#475569" strokeWidth="1.2" />
          <line x1="85" y1="120" x2="115" y2="120" stroke="#334155" strokeWidth="2.5" />
          <text x="56" y="118" fill="#1e293b" className="font-spacemono text-[5px]" stroke="none">DRW_03</text>
        </g>
      </svg>

      {/* Pop-up Box displaying Tools Skills - Colored with SVG logos */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="toolbox-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[10px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#ff9f43] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(255,159,67,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#ff9f43] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              🛠️ Tools
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Git"]} <span>Git</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["GitHub"]} <span>GitHub</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Postman"]} <span>Postman</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["VS Code"]} <span>VS Code</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["MongoDB Compass"]} <span>Compass</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["ImageKit"]} <span>ImageKit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 6. CURRENTLY LEARNING BOARD
export const CurrentlyLearning = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      {/* Title above */}
      <div className="absolute -top-7 left-2 font-cabin text-[10px] sm:text-xs text-[#a855f7] font-bold tracking-wider rotate-[1deg] pointer-events-none whitespace-nowrap">
        🤖 Currently Learning
      </div>

      <svg viewBox="0 0 220 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Board Frame - Sleek Charcoal Frame */}
        <rect 
          x="25" 
          y="25" 
          width="170" 
          height="130" 
          rx="4" 
          fill="#1e293b" 
          stroke="#0f172a"
          filter="url(#sketch-shadow)" 
        />
        {/* Whiteboard inner sheet - Clean White/Light Gray */}
        <rect x="30" y="30" width="160" height="120" rx="2" fill="#f8fafc" strokeWidth="1" stroke="#e2e8f0" />

        {/* Pinned push pins - Red and Blue pins */}
        <circle cx="45" cy="27" r="3.5" fill="#ef4444" stroke="#b91c1c" />
        <circle cx="175" cy="27" r="3.5" fill="#3b82f6" stroke="#1d4ed8" />

        {/* Neural Network Nodes Drawings - Colored Nodes */}
        <g strokeWidth="1.5" opacity={isHovered ? "1" : "0.5"}>
          {/* Node 1 */}
          <circle cx="60" cy="90" r="5" fill="#8b5cf6" stroke="#7c3aed" />
          {/* Node 2 */}
          <rect x="95" y="65" width="30" height="20" rx="2" fill="#10b981" stroke="#059669" />
          {/* Node 3 */}
          <rect x="95" y="95" width="30" height="20" rx="2" fill="#3b82f6" stroke="#2563eb" />
          {/* Node 4 */}
          <circle cx="160" cy="90" r="5" fill="#ec4899" stroke="#db2777" />

          {/* Connection lines */}
          <line x1="65" y1="90" x2="95" y2="75" stroke="#475569" />
          <line x1="65" y1="90" x2="95" y2="105" stroke="#475569" />
          <line x1="125" y1="75" x2="155" y2="90" stroke="#475569" />
          <line x1="125" y1="105" x2="155" y2="90" stroke="#475569" />
        </g>

        {/* Sketch text details */}
        <text x="110" y="44" textAnchor="middle" fill="#475569" className="font-spacemono text-[6px] font-bold" stroke="none">SYS_DESIGN_&_AI</text>
      </svg>

      {/* Pop-up Box displaying Learning Skills - Colored with SVG logos */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="learning-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[10px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#a855f7] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(168,85,247,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#a855f7] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              🧠 Learning
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["Generative AI"]} <span>Generative AI</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                {TECH_ICONS["System Design"]} <span>System Design</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 7. ACHIEVEMENT WALL
export const AchievementWall = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none desk-sketch-wiggle transition-all duration-300"
    >
      <svg viewBox="0 0 220 180" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <SketchShadow />
        </defs>

        {/* Achievement Board Background Pinboard - Sleek Light Grey Feltboard */}
        <path 
          d="M 25,25 L 195,25 C 197,25 199,27 199,29 L 199,151 C 199,153 197,155 195,155 L 25,155 C 23,155 21,153 21,151 L 21,29 C 21,27 23,25 25,25 Z" 
          fill="#f1f5f9" 
          stroke="#1e293b"
          filter="url(#sketch-shadow)" 
        />
        {/* Double hand-drawn frame inner line */}
        <path d="M 27,27 L 197,27 L 197,153 L 27,153 Z" opacity="0.2" stroke="#1e293b" strokeWidth="1" fill="none" />

        {/* Pinned card 1: LeetCode (Rotated left) - White Polaroid */}
        <g 
          className="transition-transform duration-500 ease-out origin-center"
          style={{ transform: isHovered ? 'rotate(-6deg) scale(1.05) translateY(-5px)' : 'rotate(-4deg)' }}
        >
          <rect x="35" y="40" width="68" height="92" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
          <rect x="40" y="45" width="58" height="54" fill="#0f172a" stroke="none" opacity="0.9" />
          {/* Polaroid drawing grid */}
          <line x1="45" y1="108" x2="93" y2="108" strokeWidth="1.5" stroke="#e2e8f0" />
          <line x1="45" y1="116" x2="80" y2="116" strokeWidth="1" stroke="#cbd5e1" opacity="0.5" />
          <text x="69" y="125" textAnchor="middle" fill="#eab308" className="font-spacemono text-[6.5px] font-black" stroke="none">300+ LEETCODE</text>
        </g>

        {/* Pinned card 2: Hackathon (Rotated right) - White Polaroid */}
        <g 
          className="transition-transform duration-500 ease-out origin-center"
          style={{ transform: isHovered ? 'rotate(6deg) scale(1.05) translateY(-5px)' : 'rotate(4deg)', transitionDelay: '0.05s' }}
        >
          <rect x="115" y="40" width="68" height="92" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
          <rect x="120" y="45" width="58" height="54" fill="#0f172a" stroke="none" opacity="0.9" />
          <line x1="125" y1="108" x2="173" y2="108" strokeWidth="1.5" stroke="#e2e8f0" />
          <line x1="125" y1="116" x2="160" y2="116" strokeWidth="1" stroke="#cbd5e1" opacity="0.5" />
          <text x="149" y="125" textAnchor="middle" fill="#db2777" className="font-spacemono text-[6.5px] font-black" stroke="none">TOP 20 UHACK</text>
        </g>

        {/* Pins on polaroid cards - Red Pins */}
        <circle cx="69" cy="36" r="2.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
        <circle cx="149" cy="36" r="2.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
      </svg>

      {/* Achievement stats overlay details popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="achievements-skills-popup"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-[10px] left-[20px] w-[230px] p-4 bg-neutral-950/95 border-2 border-[#f1c40f] text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(241,196,15,0.15)] pointer-events-none select-none z-50 font-spacemono text-left leading-normal"
          >
            <div className="text-[#f1c40f] font-black tracking-widest border-b-2 border-dashed border-neutral-800 pb-1.5 mb-3 font-outfit text-sm uppercase flex items-center gap-1.5">
              🏆 Achievements
            </div>
            <div className="space-y-2 text-neutral-200">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-[#f1c40f]">⭐</span> <span>TOP 20 — UHack 4.0</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-[#f1c40f]">⭐</span> <span>300+ LeetCode Solved</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-[#f1c40f]">⭐</span> <span>CGPA: 9.3 (Academics)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00f2fe]">
                <span className="text-[#00f2fe]">⭐</span> <span>Full Stack Developer</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 7. COFFEE MUG WITH ANIMATED STEAM
export const CoffeeMug = () => {
  const [steamSymbol, setSteamSymbol] = useState("</>");

  useEffect(() => {
    const symbols = ["</>", "{}", "C", "JS", "PY", "⚛️"];
    const interval = setInterval(() => {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      setSteamSymbol(randomSymbol);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none pointer-events-none">
      
      {/* Floating morphing steam code character */}
      <div className="absolute top-[10%] font-spacemono text-[10px] sm:text-xs font-bold text-[#f59e0b] select-none animate-steam pointer-events-none">
        {steamSymbol}
      </div>

      <svg viewBox="0 0 120 120" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Mug Shadow */}
        <ellipse cx="60" cy="98" rx="26" ry="4" fill="rgba(0,0,0,0.25)" stroke="none" />

        {/* Coffee Mug Handle - Cerulean Blue */}
        <path d="M 82,50 C 98,50 98,82 82,82" stroke="#0284c7" strokeWidth="2.5" />
        <path d="M 80,54 C 92,54 92,78 80,78" stroke="#0369a1" strokeWidth="1.2" opacity="0.5" />

        {/* Coffee Mug Body - Cerulean Blue */}
        <path 
          d="M 38,42 L 82,42 L 78,94 C 78,96 76,98 73,98 L 47,98 C 44,98 42,96 42,94 Z" 
          fill="#0284c7" 
          stroke="#0369a1"
          strokeWidth="1.8"
        />
        {/* Double hand-drawn mug borders */}
        <path d="M 40,44 L 80,44 L 76,92 C 76,93 75,94 74,94 L 46,94 C 45,94 44,93 44,92 Z" opacity="0.3" stroke="#e0f2fe" strokeWidth="1" fill="none" />

        {/* Coffee level inside - Rich Espresso Brown */}
        <ellipse cx="60" cy="42" rx="22" ry="3.5" fill="#451a03" stroke="#0369a1" strokeWidth="1.2" />
        <ellipse cx="60" cy="42" rx="18" ry="2.5" fill="#78350f" stroke="none" opacity="0.9" />

        {/* Heat steam lines */}
        <path d="M 52,30 Q 48,22 56,14" opacity="0.4" stroke="#f59e0b" strokeWidth="1.2" className="animate-steam" style={{ animationDelay: '0.5s' }} />
        <path d="M 68,30 Q 72,20 64,12" opacity="0.4" stroke="#f59e0b" strokeWidth="1.2" className="animate-steam" style={{ animationDelay: '2s' }} />
      </svg>
    </div>
  );
};

// 8. PENCIL INTERACT (cursor follow & hover note drawing)
export const PencilInteract = ({ mousePos = { x: 0, y: 0 } }) => {
  const containerRef = useRef(null);
  const pencilTimerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [scribbleNote, setScribbleNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  // Proximity tracking to rotate the pencil towards the cursor
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pencilX = rect.left + rect.width / 2;
    const pencilY = rect.top + rect.height / 2;

    const dx = mousePos.x - pencilX;
    const dy = mousePos.y - pencilY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Rotate but damp the rotation slightly to keep it look natural
    setRotation(angle - 45); // Adjust offset to lay nicely
  }, [mousePos]);

  const handleHoverPencil = () => {
    if (pencilTimerRef.current) {
      clearTimeout(pencilTimerRef.current);
    }
    const notes = [
      "// keep building",
      "// solve problems",
      "// ship it",
      "// dream big",
      "// clean code is key"
    ];
    const randNote = notes[Math.floor(Math.random() * notes.length)];
    setScribbleNote(randNote);
    setShowNote(true);
    pencilTimerRef.current = setTimeout(() => {
      setShowNote(false);
      pencilTimerRef.current = null;
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (pencilTimerRef.current) {
        clearTimeout(pencilTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleHoverPencil}
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* Pencil Scribbled Fade Notes */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            key="pencil-scribble-note"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: -15 }}
            exit={{ opacity: 0 }}
            className="absolute top-[-15px] font-spacemono text-[9px] sm:text-xs font-semibold text-[#f59e0b] italic pointer-events-none select-none"
          >
            {scribbleNote}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pencil drawing - Classic yellow school pencil */}
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-none stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Pencil Shadow */}
          <line x1="24" y1="79" x2="79" y2="24" stroke="rgba(0,0,0,0.2)" strokeWidth="4" />

          {/* Pencil Lead Tip */}
          <path d="M 20,80 L 25,75 L 20,70 Z" fill="#1e293b" stroke="#1e293b" />
          {/* Pencil Wood Connection */}
          <path d="M 25,75 L 30,70 L 25,65 Z" fill="#fef08a" stroke="#fef08a" />

          {/* Pencil Body Shaft - Yellow with green stripes */}
          <path d="M 30,70 L 75,25 L 80,30 L 35,75 Z" fill="#eab308" stroke="#ca8a04" />
          <line x1="32" y1="72" x2="77" y2="27" strokeWidth="0.8" stroke="#15803d" opacity="0.7" />
          <line x1="34" y1="74" x2="79" y2="29" strokeWidth="0.8" stroke="#15803d" opacity="0.7" />

          {/* Pencil Eraser end - Pink Eraser with metal collar */}
          <path d="M 75,25 L 78,22 C 79,21 80,21 81,22 C 82,23 82,24 81,25 L 78,28 Z" fill="#f472b6" stroke="#ec4899" />
          <rect x="74" y="24" width="4" height="4" transform="rotate(-45 74 24)" fill="#94a3b8" stroke="#64748b" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

// 9. STICKY NOTES
export const StickyNotes = ({ text = "Build. Break. Learn.", rotate = "-5deg", bgColor = "bg-[#fef9c3] border-[#fef08a]" }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className={`absolute w-28 h-28 p-3 border shadow-md text-left font-cabin text-[10px] sm:text-xs font-bold text-neutral-800 leading-relaxed cursor-pointer select-none flex flex-col justify-between rounded-[2px] ${bgColor}`}
      style={{
        rotate,
        boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Pinned top tape */}
      <div className="absolute top-[-8px] left-[34px] w-10 h-3 bg-neutral-200/40 border border-neutral-300/30 opacity-70 transform rotate-[-2deg]" />
      
      {/* Ruled lines */}
      <div className="flex-1 flex flex-col justify-center text-center italic tracking-wide">
        "{text}"
      </div>
      
      <div className="text-[7px] text-right font-spacemono text-neutral-500 uppercase tracking-widest mt-1.5 leading-none">
        // sticky
      </div>
    </motion.div>
  );
};
