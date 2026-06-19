import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LaptopFrontend,
  NotebookLanguages,
  ServerRackBackend,
  DatabaseShelf,
  DeveloperToolbox,
  CurrentlyLearning,
  AchievementWall,
  CoffeeMug,
  PencilInteract,
  StickyNotes
} from './DeskObjects';
import { TECH_ICONS } from './TechIcons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Workspace = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track cursor position to send coordinates to the pencil interaction component
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark fade in
      gsap.fromTo('.skills-watermark',
        { opacity: 0, y: 30 },
        {
          opacity: 0.02,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#workspace',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 2. Technical annotations fade & scale in
      gsap.fromTo('.skills-annotation',
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 0.05,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#workspace',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 3. Spotlight fade in
      gsap.fromTo('.skills-spotlight',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 0.03,
          scale: 1,
          duration: 1.5,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#workspace',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 4. Sketch arrows draw animation
      gsap.fromTo('.skills-path',
        { strokeDashoffset: 120, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.03,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '#workspace',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      id="workspace" 
      className="relative w-full min-h-screen overflow-hidden py-16 px-4 md:px-8 bg-[#FAFAFA] text-neutral-900 border-t border-dashed border-neutral-200"
    >
      {/* Layered Background System */}
      <div className="paper-texture" />
      <div className="blueprint-grid-80" />

      {/* Giant Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="skills-watermark text-[14rem] sm:text-[18rem] md:text-[25rem] font-black font-outfit text-neutral-900 tracking-tighter uppercase leading-none select-none" style={{ opacity: 0.02 }}>
          WORKSPACE
        </div>
      </div>

      {/* Technical Annotations */}
      <div className="absolute top-[10%] left-[5%] font-spacemono text-[10px] md:text-xs font-bold text-neutral-900 select-none pointer-events-none z-10 skills-annotation" style={{ opacity: 0.05 }}>// frontend</div>
      <div className="absolute top-[8%] right-[8%] font-spacemono text-[10px] md:text-xs font-bold text-neutral-900 select-none pointer-events-none z-10 skills-annotation" style={{ opacity: 0.05 }}>// backend</div>
      <div className="absolute bottom-[8%] left-[8%] font-spacemono text-[10px] md:text-xs font-bold text-neutral-900 select-none pointer-events-none z-10 skills-annotation" style={{ opacity: 0.05 }}>// databases</div>
      <div className="absolute bottom-[6%] right-[10%] font-spacemono text-[10px] md:text-xs font-bold text-neutral-900 select-none pointer-events-none z-10 skills-annotation" style={{ opacity: 0.05 }}>// tools</div>
      <div className="absolute top-[48%] right-[5%] font-spacemono text-[10px] md:text-xs font-bold text-neutral-900 select-none pointer-events-none z-10 skills-annotation" style={{ opacity: 0.05 }}>// AI</div>

      {/* Center Spotlight behind Laptop */}
      <div className="absolute left-[35%] top-[25%] w-[30%] h-[35%] bg-neutral-950 rounded-full blur-[120px] pointer-events-none select-none z-0 skills-spotlight" style={{ opacity: 0.03 }} />

      <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-12 space-y-3 select-none">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 font-spacemono"
          >
            :hover on
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-neutral-900 font-outfit"
          >
           Skills on my desk
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 font-semibold text-xs sm:text-sm md:text-base leading-relaxed font-space max-w-2xl"
          >
            Every tool, framework, and technology here has played a role in my journey from writing my first line of code to building full-stack applications. Explore my desk to view details.
          </motion.p>
        </div>

        {/* 1. DESKTOP VIEWPORT: Top-Down Desk Surface Workspace (visible on md screens and up) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:block w-full relative aspect-[16/10] border-[10px] border-solid border-white rounded-[32px] p-6 md:p-8 bg-[#e8d8c8] shadow-2xl select-none overflow-hidden"
        >
          {/* Background Pencil Doodles & Marks inside the desk */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-neutral-400/60 fill-none" strokeWidth="1">
            {/* Paper Grid background */}
            <pattern id="desk-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" stroke="rgba(0,0,0,0.02)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#desk-grid-pattern)" />
            
            {/* Connection sketch arrows */}
            <path d="M 68,54 Q 92,30 115,54" strokeDasharray="2 2" opacity="0.3" />
            <path d="M 115,54 L 110,50 M 115,54 L 110,58" opacity="0.3" />
          </svg>

          {/* Subtle sketch connector arrows (Notebook -> Laptop, Laptop -> Server, Server -> Database) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-neutral-950 fill-none" viewBox="0 0 1000 625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.03 }}>
            {/* Notebook (Languages) -> Laptop (Frontend) */}
            <path d="M 230,220 Q 350,180 400,280" className="skills-path" strokeDasharray="5 5" />
            <path d="M 385,275 L 400,280 L 395,260" strokeDasharray="none" className="skills-path" />

            {/* Laptop (Frontend) -> Server (Backend) */}
            <path d="M 600,310 Q 750,220 780,240" className="skills-path" strokeDasharray="5 5" />
            <path d="M 765,235 L 780,240 L 775,255" strokeDasharray="none" className="skills-path" />

            {/* Server (Backend) -> Database (Storage) */}
            <path d="M 840,320 L 840,380" className="skills-path" strokeDasharray="5 5" />
            <path d="M 833,370 L 840,380 L 847,370" strokeDasharray="none" className="skills-path" />

            {/* Angle scale markings */}
            <circle cx="100" cy="115" r="24" strokeDasharray="5 5" opacity="0.08" />
            <line x1="72" y1="115" x2="128" y2="115" opacity="0.08" />
            <line x1="100" y1="87" x2="100" y2="143" opacity="0.08" />

            {/* Pencil sketch stars */}
            <path d="M 24,42 L 26,45 L 29,45 L 27,47 L 28,50 L 24,48 L 20,50 L 21,47 L 19,45 L 22,45 Z" opacity="0.15" />
            <path d="M 182,142 L 183,144 L 186,144 L 184,146 L 185,149 L 182,147 L 179,149 L 180,146 L 178,144 L 181,144 Z" opacity="0.15" />
          </svg>

          {/* TOP ROW: Achievement Wall */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute left-[37%] top-[3%] w-[26%] h-[24%]"
          >
            <AchievementWall />
          </motion.div>

          {/* MIDDLE ROW */}
          {/* Left page: Notebook (Languages) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-[5%] top-[18%] w-[22%] h-[34%]"
          >
            <NotebookLanguages />
          </motion.div>

          {/* Center: Laptop Workspace (Frontend centerpiece) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute left-[32%] top-[27%] w-[36%] h-[40%]"
          >
            <LaptopFrontend />
          </motion.div>

          {/* Right: Server Rack (Backend) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-[73%] top-[18%] w-[22%] h-[34%]"
          >
            <ServerRackBackend />
          </motion.div>

          {/* BOTTOM-MIDDLE ROW */}
          {/* Left-Bottom: Developer Toolbox (Tools) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute left-[5%] top-[72%] w-[22%] h-[24%]"
          >
            <DeveloperToolbox />
          </motion.div>

          {/* Center-Bottom: Pencil Interact */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute left-[45%] top-[66%] w-[10%] h-[16%]"
          >
            <PencilInteract mousePos={mousePos} />
          </motion.div>

          {/* Right-Bottom: Database Shelf */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute left-[73%] top-[47%] w-[22%] h-[32%]"
          >
            <DatabaseShelf />
          </motion.div>

          {/* BOTTOM ROW */}
          {/* Center bottom: Currently Learning Board */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="absolute left-[34%] top-[75%] w-[32%] h-[24%]"
          >
            <CurrentlyLearning />
          </motion.div>

          {/* Right-Bottom-most corner: Coffee Mug */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute left-[76%] top-[76%] w-[14%] h-[20%]"
          >
            <CoffeeMug />
          </motion.div>

          {/* SCATTERED STICKY NOTES */}
          {/* Note 1: Center Left */}
          <div className="absolute left-[4%] top-[50%]">
            <StickyNotes text="Build. Break. Learn." rotate="-6deg" bgColor="bg-yellow-100/90 border-yellow-300 text-yellow-900" />
          </div>

          {/* Note 2: Left Middle-Center */}
          <div className="absolute left-[20%] top-[50%]">
            <StickyNotes text="Think in systems." rotate="4deg" bgColor="bg-cyan-100/90 border-cyan-300 text-cyan-900" />
          </div>

          {/* Note 3: Top Right */}
          <div className="absolute left-[83%] top-[4%]">
            <StickyNotes text="Keep shipping." rotate="-3deg" bgColor="bg-rose-100/90 border-rose-300 text-rose-900" />
          </div>

          {/* Note 4: Top Left */}
          <div className="absolute left-[7%] top-[4%]">
            <StickyNotes text="Debugging ≠ Failure" rotate="6deg" bgColor="bg-emerald-100/90 border-emerald-300 text-emerald-900" />
          </div>
        </motion.div>

        {/* 2. MOBILE VIEWPORT: Vertical stack of category cards (visible on < md screens) */}
        <div className="md:hidden w-full space-y-6 px-2">
          {/* Notebook (Languages) Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Languages
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Core Programming Fundamentals</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Java"]} <span>Java</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Python"]} <span>Python</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["JavaScript"]} <span>JavaScript</span>
              </div>
            </div>
          </motion.div>

          {/* Laptop (Frontend) Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Frontend
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Modern User Interfaces</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["HTML"]} <span>HTML</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["CSS"]} <span>CSS</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Tailwind CSS"]} <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["React.js"]} <span>React.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Next.js"]} <span>Next.js</span>
              </div>
            </div>
          </motion.div>

          {/* Server Rack (Backend) Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Backend
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Scalable Server Architectures</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Node.js"]} <span>Node.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Express.js"]} <span>Express.js</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["REST APIs"]} <span>REST APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["JWT Authentication"]} <span>JWT Authentication</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["MVC Architecture"]} <span>MVC Architecture</span>
              </div>
            </div>
          </motion.div>

          {/* Database Shelf Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Database
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Data Storage & Ecosystems</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["MongoDB"]} <span>MongoDB</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Mongoose"]} <span>Mongoose</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["MySQL"]} <span>MySQL</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["PostgreSQL (Supabase)"]} <span>PostgreSQL (Supabase)</span>
              </div>
            </div>
          </motion.div>

          {/* Developer Toolbox (Tools) Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Tools
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Developer Workspace & Workflow</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Git"]} <span>Git</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["GitHub"]} <span>GitHub</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Postman"]} <span>Postman</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["VS Code"]} <span>VS Code</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["MongoDB Compass"]} <span>MongoDB Compass</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["ImageKit"]} <span>ImageKit</span>
              </div>
            </div>
          </motion.div>

          {/* Currently Learning Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Learning
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Current Technology Explorations</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["Generative AI"]} <span>Generative AI</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase text-neutral-800">
                {TECH_ICONS["System Design"]} <span>System Design</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-[3px] border-neutral-900 rounded-none p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col space-y-3 text-neutral-900"
          >
            <div className="text-neutral-900 font-black tracking-widest font-spacemono text-sm uppercase">
              ■ Achievements
            </div>
            <div className="text-[10px] text-neutral-500 font-cabin italic leading-none">// Milestones & Accomplishments</div>
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <span>⭐</span> <span>TOP 20 — UHack 4.0 Hackathon</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <span>⭐</span> <span>300+ Solved LeetCode Problems</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <span>⭐</span> <span>CGPA: 9.3 (Academics)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <span>⭐</span> <span>Full Stack Developer</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Workspace;
