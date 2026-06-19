import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leetcodeLogoImg from '../assets/Leet.png';

const IDENTITY_SYSTEM = [
  { label: "⚡ Full Stack Developer", desc: "Building Real-World Products" },
  { label: "💻 Software Engineer", desc: "300+ LeetCode Problems Solved" },
  { label: "🧠 Gen AI Enthusiast", desc: "Learning Generative AI" },
  { label: "🌐 Web Creator", desc: "Creating Modern Web Experiences" }
];

const STATUSES = [
  { verb: "Currently Building", subject: "Few Projects" },
  { verb: "Currently Exploring", subject: "Generative AI" },
  { verb: "Currently Solving", subject: "System Design" },
  { verb: "Currently Writing", subject: "Framer Canvas" }
];

const JOKES = [
  { Q: "Why do programmers wear glasses?", A: "Because they can't C#." },
  { Q: "A SQL query walks into a bar...", A: "Walks up to two tables and asks, 'Can I join you?'" },
  { Q: "How many programmers does it take to change a light bulb?", A: "None, that's a hardware problem." },
  { Q: "['hip', 'hip']", A: "(hip hip array!)" },
  { Q: "Why was the mobile phone wearing glasses?", A: "Because it lost its contacts." }
];

const NAV_ITEMS = ["About", "Skills", "Projects", "Experience", "Achievements", "Contact"];
const NAV_MAPPING = {
  "About": "about-me",
  "Skills": "workspace",
  "Projects": "projects",
  "Experience": "experience",
  "Achievements": "achievements",
  "Contact": "contact"
};

const ID_TO_NAV = {
  "about-me": "About",
  "workspace": "Skills",
  "projects": "Projects",
  "experience": "Experience",
  "achievements": "Achievements",
  "contact": "Contact"
};

const navigateToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const [activeItem, setActiveItem] = useState("About");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [identityIndex, setIdentityIndex] = useState(0);
  const [displayedDesc, setDisplayedDesc] = useState("");

 
  const [statusIndex, setStatusIndex] = useState(0);

  
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isCtaClicked, setIsCtaClicked] = useState(false);
  const [ctaParticles, setCtaParticles] = useState([]);

 
  const [jokeIndex, setJokeIndex] = useState(0);
  const [jokeBounce, setJokeBounce] = useState(false);
  const [checklist, setChecklist] = useState({
    coffee: true,
    sleep: false,
    bugs: true
  });


  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);

  const videoRef = useRef(null);
  const fullscreenVideoRef = useRef(null);

  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const navItem = ID_TO_NAV[entry.target.id];
          if (navItem) {
            setActiveItem(navItem);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(NAV_MAPPING).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let text = "";
    let charIndex = 0;
    let isDeletingChar = false;
    let typingTimer;

    const type = () => {
      if (!isMounted) return;
      const currentWord = IDENTITY_SYSTEM[identityIndex].desc;

      if (!isDeletingChar) {
        text = currentWord.substring(0, charIndex + 1);
        setDisplayedDesc(text);
        charIndex++;

        if (charIndex === currentWord.length) {
          typingTimer = setTimeout(() => {
            isDeletingChar = true;
            type();
          }, 1800);
          return;
        }
      } else {
        text = currentWord.substring(0, charIndex - 1);
        setDisplayedDesc(text);
        charIndex--;

        if (charIndex === 0) {
          isDeletingChar = false;
          setIdentityIndex((prev) => (prev + 1) % IDENTITY_SYSTEM.length);
          return;
        }
      }

      const speed = isDeletingChar ? 25 : 55;
      typingTimer = setTimeout(type, speed);
    };

    type();

    return () => {
      isMounted = false;
      clearTimeout(typingTimer);
    };
  }, [identityIndex]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUSES.length);
    }, 4000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    if (!isCtaHovered) return;
    const interval = setInterval(() => {
      setCtaParticles(prev => {
        const newParticle = {
          id: Math.random(),
          x: (Math.random() - 0.5) * 140,
          y: (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -0.5 - Math.random() * 1.2,
          size: Math.random() * 2.5 + 1,
          opacity: 1
        };
        
        return [...prev.slice(-15), newParticle]
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.05
          }))
          .filter(p => p.opacity > 0);
        });
      }, 60);
      return () => clearInterval(interval);
  }, [isCtaHovered]);

  const handleCtaClick = () => {
    setIsCtaClicked(true);
    setTimeout(() => {
      navigateToSection("about-me");
      setIsCtaClicked(false);
    }, 850);
  };

  const handleFullscreenPlay = () => {
    setIsFullscreenVideo(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenVideo(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  const handleJokeClick = () => {
    setJokeBounce(true);
    setTimeout(() => setJokeBounce(false), 500);
    setJokeIndex((prev) => (prev + 1) % JOKES.length);
  };

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAll = (e) => {
    e.stopPropagation();
    setChecklist(prev => ({
      coffee: !prev.coffee,
      sleep: !prev.sleep,
      bugs: !prev.bugs
    }));
  };

  useEffect(() => {
    if (isFullscreenVideo && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = 0;
      fullscreenVideoRef.current.muted = false;
      fullscreenVideoRef.current.play().catch(err => console.log("Fullscreen play blocked:", err));
    }
  }, [isFullscreenVideo]);

  // Framer Motion variants
  const loadSequence = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleNavClick = (item) => {
    const targetId = NAV_MAPPING[item];
    navigateToSection(targetId);
    setActiveItem(item);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden text-neutral-900 flex flex-col select-none pb-20"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #FFFFFF 0%, #F5F5F7 35%, #E5E5EA 70%, #D1D1D6 100%)'
      }}
    >
      {/* Premium layered background system: Paper Texture and Blueprint Grid */}
      <div className="paper-texture" />
      <div className="blueprint-grid-80 opacity-60" />

      {/* Background spotlights for depth */}
      <div className="absolute top-[10%] left-[20%] w-[50%] aspect-square bg-neutral-950/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[5%] right-[10%] w-[40%] aspect-square bg-neutral-950/5 rounded-full blur-[100px] pointer-events-none select-none z-0" />
      {/* 1. BACKGROUND LAYERS & PARALLAX */}

      {/* Grid Lines Parallax Layer */}
      <div 
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}
        className="absolute inset-0 pointer-events-none z-0 select-none opacity-[0.06]"
      >
        <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,rgba(0,0,0,0.85)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.85)_1px,transparent_1px)]" />
      </div>

      {/* Floating Blueprint Annotations & Coordinate Labels */}
      <div 
        style={{
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`
        }}
        className="absolute inset-0 pointer-events-none z-0 select-none text-neutral-400 font-spacemono text-[9px] font-bold opacity-[0.15]"
      >
        {/* Developer notes */}
        <span className="absolute top-[16%] left-[8%]">// building products</span>
        <span className="absolute top-[72%] left-[10%]">// learning never stops</span>
        <span className="absolute top-[28%] right-[12%]">// 300+ LC solved</span>
        <span className="absolute top-[80%] right-[15%]">// system design explorer</span>

        {/* Coordinate details */}
        <span className="absolute top-[45%] left-[5%]">[x: 104.3, y: 789.2]</span>
        <span className="absolute top-[60%] right-[6%]">[x: 912.4, y: 120.9]</span>
        <span className="absolute top-[88%] left-[25%]">[scale: 1.40f]</span>


      </div>

      {/* 2. FLOATING HEADER NAVBAR - Scrolls spy & slide-down entrance */}
      <motion.header
        initial={{ y: -65, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 h-[65px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/40 shadow-sm' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left Side: Brand Logos & Links */}
        <div className="flex items-center gap-5 relative z-50">
          {/* LeetCode link and image logo */}
          <a
            href="https://leetcode.com/u/ujjwalmishraCse27/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="LeetCode"
          >
            <img 
              src={leetcodeLogoImg} 
              alt="LeetCode" 
              className="w-7 h-7 object-contain rounded-md" 
            />
          </a>
          {/* GitHub link and colored logo */}
          <a
            href="https://github.com/ujjwalmishraCSE27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="GitHub"
          >
            <svg className="w-7 h-7 fill-[#181717]" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          {/* LinkedIn link and colored logo */}
          <a
            href="https://www.linkedin.com/in/ujjwal-mishra-444a37301/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <svg className="w-7 h-7 fill-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          {/* Gmail/Mail link and colored logo */}
          <a
            href="mailto:ujjwalmishracse27@gmail.com"
            className="hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Email"
          >
            <svg className="w-7 h-7 fill-[#EA4335]" viewBox="0 0 24 24">
              <path d="M24 5.457v13.918c0 .904-.732 1.637-1.636 1.637h-3.818V11.5L12 16.64 5.454 11.5v9.512H1.636A1.636 1.636 0 010 19.375V5.457c0-.904.732-1.636 1.636-1.636h3.818L12 9.073l6.545-5.251h3.818c.904 0 1.637.732 1.637 1.636z" />
            </svg>
          </a>

          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            download="Ujjwal_Mishra_Resume.pdf"
            className="ml-2 px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 text-white text-[10px] font-spacemono uppercase font-black tracking-widest border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md flex items-center gap-1.5 cursor-pointer outline-none select-none"
          >
            <span>Resume</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Right Side: Navigation spy links (underline line removed) */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`relative px-3 py-2 font-spacemono text-[10px] tracking-widest uppercase transition-all duration-300 hover:tracking-[0.16em] ${
                  isActive 
                    ? 'text-neutral-950 font-black' 
                    : 'text-neutral-500 hover:text-neutral-955 font-bold'
                }`}
              >
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Hamburger Menu Toggle Button (Visible on Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-0 bg-transparent relative z-50 cursor-pointer outline-none"
          aria-label="Toggle Menu"
        >
          <svg width="24" height="18" viewBox="0 0 24 18" stroke="black" strokeWidth="2.5" fill="none">
            <motion.path 
              d={isMobileMenuOpen ? "M 4,4 L 20,14" : "M 2,2 L 22,2"} 
              animate={{ d: isMobileMenuOpen ? "M 4,4 L 20,14" : "M 2,2 L 22,2" }} 
              transition={{ duration: 0.3 }}
            />
            {!isMobileMenuOpen && (
              <motion.path 
                d="M 2,9 L 22,9" 
                initial={{ opacity: 1 }}
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <motion.path 
              d={isMobileMenuOpen ? "M 4,14 L 20,4" : "M 2,16 L 22,16"} 
              animate={{ d: isMobileMenuOpen ? "M 4,14 L 20,4" : "M 2,16 L 22,16" }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>
      </motion.header>

      {/* Mobile Lined-Paper Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 200 }}
            className="fixed inset-0 z-45 bg-white flex flex-col items-center justify-center border-l border-neutral-100 md:hidden"
          >
            <div className="relative z-10 flex flex-col items-center gap-7 text-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const targetId = NAV_MAPPING[item];
                      navigateToSection(targetId);
                      setActiveItem(item);
                    }, 300);
                  }}
                  className="font-outfit text-3xl font-black text-neutral-800 hover:text-neutral-900 tracking-wider uppercase py-1 bg-transparent border-0 outline-none cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  {item}
                </button>
              ))}

              {/* Mobile Resume Link */}
              <a
                href="/resume.pdf"
                download="Ujjwal_Mishra_Resume.pdf"
                className="mt-2 px-6 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white text-sm font-spacemono uppercase font-black tracking-widest border-2 border-neutral-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md flex items-center gap-2 cursor-pointer outline-none select-none"
              >
                <span>Resume</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-spacemono text-xs font-bold text-[#ff007f] hover:text-[#ff007f]/80 tracking-widest uppercase py-2 bg-transparent border border-dashed border-[#ff007f]/30 px-6 rounded-lg cursor-pointer hover:scale-105 active:scale-95 transition-all mt-6"
              >
                &larr; Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN STAGE WRAPPER - Cinematic scroll sequence */}
      <motion.div 
        variants={loadSequence}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 pt-32 flex flex-col items-center justify-start text-center"
      >
        {/* A. Name Title Header */}
        <motion.div 
          variants={itemVariants}
          className="w-full flex flex-col items-center select-none mb-4"
        >
          {/* Stagger reveal name letters */}
          <motion.h1 
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.15
                }
              }
            }}
            className="font-inter font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-neutral-900 uppercase leading-[1.0] whitespace-nowrap"
          >
            {"Ujjwal Mishra".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, filter: "blur(6px)", scale: 1.06, y: 12 },
                  visible: {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtle Pencil Horizontal Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="h-[1.5px] bg-neutral-300 w-full max-w-lg my-6"
          />
        </motion.div>

        {/* B. Typewriter Rotating Subtitles ("full stack developer effect") */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center select-none font-space text-sm sm:text-base md:text-lg text-neutral-500 font-semibold tracking-wide gap-y-1 mb-8"
        >
          {/* Rotating Label */}
          <span className="text-neutral-900 font-bold uppercase tracking-widest font-spacemono text-xs sm:text-sm">
            {IDENTITY_SYSTEM[identityIndex].label}
          </span>
          {/* Separator line */}
          <div className="w-[1.5px] h-3.5 bg-neutral-300 my-1 hidden sm:block" />
          {/* Identity typewriter description */}
          <span className="text-neutral-800 font-bold italic tracking-wide">
            | {displayedDesc}
            <span className="animate-pulse ml-0.5 text-neutral-500 font-sans">|</span>
          </span>
        </motion.div>

        {/* C. KEYNOTE VIDEO & SIDEBAR CARDS ROW */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col xl:flex-row items-center justify-center gap-8 mb-12 relative z-30"
        >
          {/* Left Sidebar Card - Coding Joke Sticky Note */}
          <motion.div
            animate={jokeBounce ? { scale: [1, 0.95, 1.05, 1], rotate: [-2, -5, 2, -2] } : {}}
            transition={{ duration: 0.4 }}
            className="xl:w-64 w-full max-w-sm bg-yellow-50/90 border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 rounded-xl rotate-[-2deg] hover:rotate-[0deg] transition-all select-none font-cabin flex flex-col justify-between min-h-[220px] text-left"
          >
            <div>
              <span className="text-[10px] font-spacemono uppercase text-neutral-400 font-bold tracking-widest block mb-2">
                // Coding Joke 💡
              </span>
              <p className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                {JOKES[jokeIndex].Q}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-neutral-600 mt-3 italic">
                {JOKES[jokeIndex].A}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleJokeClick}
                className="px-3.5 py-1.5 bg-[#ff5f56] hover:bg-[#e04f46] text-white text-[10px] font-spacemono uppercase font-black border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md cursor-pointer self-start"
              >
                Click for a new one
              </button>
            </div>
          </motion.div>

          {/* Center Column - Keynote Video MacOS Mockup */}
          <div
            onClick={handleFullscreenPlay}
            className="w-full max-w-2xl bg-white border-2 border-neutral-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden relative cursor-pointer transition-transform duration-500 hover:scale-[1.02] flex-shrink-0"
          >
            {/* MacOS style browser header */}
            <div className="w-full h-8 bg-neutral-50 border-b-2 border-neutral-900 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-900 bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-900 bg-[#27c93f]" />
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-900 bg-[#007aff]" />
              </div>
              <span className="font-spacemono text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                ujjwal_keynote.mov
              </span>
              <div className="w-10" />
            </div>

            {/* Browser body containing preview video */}
            <div className="w-full aspect-video bg-neutral-950 relative group">
              <video 
                ref={videoRef}
                src="/hero-video.mp4"
                loop
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Play Button HUD Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors duration-300">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-12 h-12 rounded-full bg-white border-2 border-neutral-900 flex items-center justify-center shadow-md text-neutral-900 cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Card - Interactive Dev Log Stats Checklist */}
          <div className="xl:w-64 w-full max-w-sm bg-emerald-50/90 border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 rounded-xl rotate-[2deg] hover:rotate-[0deg] transition-all select-none font-cabin flex flex-col justify-between min-h-[220px] text-left">
            <div>
              <span className="text-[10px] font-spacemono uppercase text-neutral-400 font-bold tracking-widest block mb-3">
                // Dev Log Stats 📝
              </span>
              <div className="flex flex-col gap-2.5">
                
                {/* Coffee */}
                <div 
                  onClick={() => toggleCheck('coffee')}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-neutral-900/5 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-4 h-4 border-2 border-neutral-900 rounded-sm flex items-center justify-center relative flex-shrink-0">
                    {checklist.coffee && (
                      <svg className="w-3 h-3 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs font-bold text-neutral-800 ${checklist.coffee ? 'line-through opacity-75' : ''}`}>
                    Coffee: {checklist.coffee ? "3 Litres ☕" : "Empty! 😭"}
                  </span>
                </div>

                {/* Sleep */}
                <div 
                  onClick={() => toggleCheck('sleep')}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-neutral-900/5 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-4 h-4 border-2 border-neutral-900 rounded-sm flex items-center justify-center relative flex-shrink-0">
                    {checklist.sleep && (
                      <svg className="w-3 h-3 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs font-bold text-neutral-800 ${checklist.sleep ? 'line-through opacity-75' : ''}`}>
                    Sleep: {checklist.sleep ? "8 Hours 😴" : "404 Error! 🚫"}
                  </span>
                </div>

                {/* Bugs */}
                <div 
                  onClick={() => toggleCheck('bugs')}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-neutral-900/5 p-1.5 rounded-lg transition-colors"
                >
                  <div className="w-4 h-4 border-2 border-neutral-900 rounded-sm flex items-center justify-center relative flex-shrink-0">
                    {checklist.bugs && (
                      <svg className="w-3 h-3 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs font-bold text-neutral-800 ${checklist.bugs ? 'line-through opacity-75' : ''}`}>
                    Bugs: {checklist.bugs ? "Squashed! 🐛" : "99+ Unresolved 🚨"}
                  </span>
                </div>

              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleToggleAll}
                className="px-3.5 py-1.5 bg-[#27c93f] hover:bg-[#21b235] text-neutral-950 text-[10px] font-spacemono uppercase font-black border-2 border-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md cursor-pointer self-start"
              >
                Click to toggle
              </button>
            </div>
          </div>
        </motion.div>

        {/* D. STATUS & CTA BUTTON SECTION (Now below the video frame) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6 relative z-30 mb-8"
        >
          {/* Status Sticky-style badge */}
          <div className="inline-flex flex-col items-center px-6 py-2 bg-white border-2 border-neutral-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg min-w-[210px] select-none rotate-[-1.5deg]">
            <span className="text-[9px] font-spacemono uppercase text-neutral-400 font-black tracking-widest">
              {STATUSES[statusIndex].verb}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="text-xs font-outfit uppercase font-black text-neutral-950 mt-0.5"
              >
                [{STATUSES[statusIndex].subject}]
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Primary CTA paper airplane button */}
          <div className="relative">
            <button
              onClick={handleCtaClick}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => { setIsCtaHovered(false); setCtaParticles([]); }}
              className="relative px-8 py-3.5 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold font-spacemono uppercase tracking-widest rounded-full transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer outline-none flex items-center justify-center gap-2 overflow-visible"
            >
              <span>Explore My Journey</span>

              {/* Hand-drawn SVG border outline animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible">
                <motion.rect
                  x="-1"
                  y="-1"
                  width="calc(100% + 2px)"
                  height="calc(100% + 2px)"
                  rx="9999"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="400"
                  initial={{ strokeDashoffset: 400 }}
                  animate={isCtaHovered ? { strokeDashoffset: 0 } : { strokeDashoffset: 400 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-neutral-500 opacity-60"
                />
              </svg>

              {/* Paper airplane landing on button */}
              <AnimatePresence>
                {isCtaHovered && !isCtaClicked && (
                  <motion.svg
                    initial={{ opacity: 0, x: -35, y: -25, rotate: -25 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="w-3.5 h-3.5 text-white inline-block fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* Launching Paper Airplane animation on click */}
            {isCtaClicked && (
              <motion.svg
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: 450, 
                  y: -350, 
                  rotate: 22, 
                  opacity: [1, 1, 0], 
                  scale: 0.45 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-5 h-5 text-neutral-900 pointer-events-none fill-current"
                viewBox="0 0 24 24"
                style={{ left: "50%", top: "20%" }}
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </motion.svg>
            )}

            {/* Float drift pencil particles */}
            {ctaParticles.map(p => (
              <div
                key={p.id}
                className="absolute bg-neutral-900 rounded-full pointer-events-none z-10"
                style={{
                  left: `calc(50% + ${p.x}px)`,
                  top: `calc(50% + ${p.y}px)`,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity
                }}
              />
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* 4. FULLSCREEN HIGH-RESOLUTION VIDEO LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {isFullscreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6 md:p-12"
          >
            {/* Background close overlay click */}
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={handleCloseFullscreen} />
            
            {/* Large High-Res Video display */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="relative w-full max-w-5xl aspect-video bg-neutral-900 border-2 border-neutral-700 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <video
                ref={fullscreenVideoRef}
                src="/hero-video.mp4"
                controls
                className="w-full h-full object-contain"
                onEnded={handleCloseFullscreen}
              />
            </motion.div>

            {/* Sketch-style close action */}
            <button
              onClick={handleCloseFullscreen}
              className="absolute top-6 right-6 z-20 px-6 py-2.5 bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg text-xs font-bold font-spacemono uppercase tracking-wider text-neutral-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Close Projection &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
