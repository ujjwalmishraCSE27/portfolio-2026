import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS } from '../data/certifications';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle Generator for Scratch Card
const createScratchParticle = (x, y) => {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.5 + Math.random() * 1.5;
  return {
    id: Math.random(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.2,
    size: 2 + Math.random() * 4,
    opacity: 1
  };
};

// Confetti Generator for Party Popper
const COLORS = ['#ff5f56', '#ffbd2e', '#27c93f', '#007aff', '#ff007f', '#8c7ae6'];
const generateConfetti = (originX, originY) => {
  return Array.from({ length: 40 }).map(() => {
    const angle = (Math.PI * 1.2) + Math.random() * (Math.PI * 0.6); // Shoot upwards
    const distance = 30 + Math.random() * 100;
    return {
      id: Math.random(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: originX,
      y: originY,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 10,
      tr: Math.random() * 360,
      size: 4 + Math.random() * 6
    };
  });
};

// Card Framer Motion Hover Variants
const cardVariants = (isLocked) => ({
  hover: isLocked 
    ? {
        x: [0, -6, 6, -6, 6, -3, 3, 0],
        y: [0, 2, -2, 2, -2, 0],
        transition: { duration: 0.45, ease: "easeInOut" }
      }
    : {
        y: -6,
        x: -6,
        boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)',
        transition: { duration: 0.2, ease: 'easeOut' }
      }
});

// --- CARD 1: SCRATCH CARD CANVAS COMPONENT ---
const ScratchCard = ({ onUnlock }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState([]);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        
        // Textured silver-gray scratch layer background
        ctx.fillStyle = '#cfd8dc';
        ctx.fillRect(0, 0, width, height);

        // Sketch diagonal scribble lines for texture
        ctx.strokeStyle = '#b0bec5';
        ctx.lineWidth = 2;
        for (let i = -height; i < width; i += 12) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + height, height);
          ctx.stroke();
        }

        // Add coin sketch text overlay
        ctx.fillStyle = '#37474f';
        ctx.font = 'bold 12px "Space Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪙 SCRATCH TO REVEAL', width / 2, height / 2);

        // Disconnect to keep the scratch marks untouched when resized
        resizeObserver.disconnect();
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Update particles in a loop
  useEffect(() => {
    if (particles.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.05, // gravity
            opacity: p.opacity - 0.03
          }))
          .filter(p => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [particles]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    scratch(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Spawn scratch particles
    const newParticles = Array.from({ length: 3 }).map(() => createScratchParticle(x, y));
    setParticles(prev => [...prev.slice(-25), ...newParticles]);

    frameCount.current++;
    if (frameCount.current % 5 === 0) {
      const p = calculateErasePercentage(ctx, canvas.width, canvas.height);
      if (p > 65 && !revealed) {
        setRevealed(true);
        onUnlock();
      }
    }
  };

  const calculateErasePercentage = (ctx, w, h) => {
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    let transparent = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 40) {
      sampled++;
      if (data[i] === 0) transparent++;
    }
    return (transparent / sampled) * 100;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[290px] rounded-xl overflow-hidden select-none border-2 border-neutral-200 bg-white">
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 cursor-pointer touch-none"
          />
        )}
      </AnimatePresence>

      {/* Render flying scratch dust particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-neutral-400 rounded-full pointer-events-none z-40"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity
          }}
        />
      ))}

      {/* Behind Revealed Details */}
      <div className="absolute inset-0 flex flex-col p-5 items-center justify-between text-center bg-neutral-50/50">
        <div className="flex flex-col items-center">
          {/* Achievement glow & Hand-drawn checkmark */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-2 bg-neutral-950/5 blur-md rounded-full animate-pulse" />
            <svg className="w-8 h-8 text-neutral-900 mb-1 z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <img src={CERTIFICATIONS.find(c => c.id === 'tcs').logo} alt="TCS" className="h-9 object-contain mb-1" />
          <h4 className="text-sm font-bold font-outfit text-neutral-900 uppercase">{CERTIFICATIONS.find(c => c.id === 'tcs').title}</h4>
          <span className="text-[9px] font-spacemono font-bold text-neutral-400 uppercase tracking-wider">{CERTIFICATIONS.find(c => c.id === 'tcs').issuer}</span>
        </div>
        <p className="text-[11px] font-space leading-relaxed text-neutral-600 px-1 font-semibold">
          "{CERTIFICATIONS.find(c => c.id === 'tcs').description}"
        </p>
        <a
          href={CERTIFICATIONS.find(c => c.id === 'tcs').link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-[9px] font-bold text-white rounded-lg font-spacemono uppercase tracking-wider transition-colors shadow-sm cursor-pointer z-10"
        >
          {CERTIFICATIONS.find(c => c.id === 'tcs').buttonText}
        </a>
      </div>
    </div>
  );
};


// --- CARD 2: SLINGSHOT CRICKET GAME COMPONENT ---
const CricketGame = ({ onUnlock }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 280, height: 290 });
  const [ballPos, setBallPos] = useState({ x: 45, y: 195 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [trajectory, setTrajectory] = useState([]);
  const [isHit, setIsHit] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [explodedStumps, setExplodedStumps] = useState(null);
  const [ballRotation, setBallRotation] = useState(0);
  const requestRef = useRef();

  // Obtain exact card width dynamically using ResizeObserver for perfect responsiveness
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        setDimensions({ width, height });
        setBallPos(prev => {
          if (!launched && !isHit) {
            return { x: width * 0.15, y: 195 };
          }
          return prev;
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [launched, isHit]);

  const initialBallPos = { x: dimensions.width * 0.15, y: 195 };
  const wicketPos = { x: dimensions.width * 0.82, y: 145 };

  const handleStart = (e) => {
    if (launched || isHit) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = dragStart.x - clientX;
    const dy = dragStart.y - clientY;

    // Clamp drag distance
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 70;
    const angle = Math.atan2(dy, dx);
    const finalDist = Math.min(dist, maxDist);

    const pullX = Math.cos(angle) * finalDist;
    const pullY = Math.sin(angle) * finalDist;

    // Ball moves as dragged back
    const nextX = initialBallPos.x - pullX * 0.5;
    const nextY = initialBallPos.y - pullY * 0.5;
    setBallPos({ x: nextX, y: nextY });

    // Slingshot velocity proportional to pull
    const vx = pullX * 0.19;
    const vy = pullY * 0.19;
    setVelocity({ x: vx, y: vy });

    // Generate trajectory path - expanded to 24 points for longer, clearer aiming guide
    const points = [];
    let tempX = nextX;
    let tempY = nextY;
    let tempVx = vx;
    let tempVy = vy;
    for (let i = 0; i < 24; i++) {
      points.push({ x: tempX, y: tempY });
      tempX += tempVx;
      tempY += tempVy;
      tempVy += 0.35; // gravity simulation
    }
    setTrajectory(points);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setLaunched(true);
    setTrajectory([]);

    let currentX = ballPos.x;
    let currentY = ballPos.y;
    let currentVx = velocity.x;
    let currentVy = velocity.y;
    let frames = 0;

    const tick = () => {
      frames++;
      currentX += currentVx;
      currentY += currentVy;
      currentVy += 0.35; // Gravity pull

      // Spin rotation
      setBallRotation(prev => prev + currentVx * 2.5);

      // Bounce on ground
      if (currentY >= 200) {
        currentY = 200;
        currentVy = -currentVy * 0.45; // Bounce bounce
        currentVx = currentVx * 0.8;

        // Reset ball if it rolls/bounces to a stop on the ground, allowing retry
        if (Math.abs(currentVx) < 0.15 && Math.abs(currentVy) < 0.5) {
          setBallPos(initialBallPos);
          setLaunched(false);
          cancelAnimationFrame(requestRef.current);
          return;
        }
      }

      // Hit Check coordinates - expanded hit box threshold from 25 to 40 for easy hit
      const dToWicket = Math.sqrt(
        Math.pow(currentX - (wicketPos.x + 8), 2) + Math.pow(currentY - (wicketPos.y + 35), 2)
      );

      if (dToWicket < 40) {
        // Trigger Explosion!
        setExplodedStumps([
          { id: 'left', x: 2, y: 10, w: '4px', h: '45px', vx: -2 - Math.random() * 3, vy: -5 - Math.random() * 4, vr: -30 - Math.random() * 40 },
          { id: 'middle', x: 12, y: 10, w: '4px', h: '45px', vx: -1 + Math.random() * 2, vy: -6 - Math.random() * 4, vr: -10 + Math.random() * 20 },
          { id: 'right', x: 22, y: 10, w: '4px', h: '45px', vx: 2 + Math.random() * 3, vy: -5 - Math.random() * 4, vr: 30 + Math.random() * 40 },
          { id: 'bail1', x: 0, y: 4, w: '12px', h: '3px', vx: -3 - Math.random() * 3, vy: -8 - Math.random() * 3, vr: -40 - Math.random() * 60 },
          { id: 'bail2', x: 14, y: 4, w: '12px', h: '3px', vx: 3 + Math.random() * 3, vy: -8 - Math.random() * 3, vr: 40 + Math.random() * 60 },
        ]);
        
        cancelAnimationFrame(requestRef.current);
        
        // Wait 0.9s for stumps flying, then unlock certification details
        setTimeout(() => {
          setIsHit(true);
          onUnlock();
        }, 950);
        return;
      }

      // Out of bounds reset (or safety timeout at 240 frames / 4 seconds)
      if (currentY > 280 || currentX > dimensions.width + 30 || currentX < -20 || frames > 240) {
        setBallPos(initialBallPos);
        setLaunched(false);
        cancelAnimationFrame(requestRef.current);
        return;
      }

      setBallPos({ x: currentX, y: currentY });
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const powerRatio = Math.min(Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y) / 10, 1);

  return (
    <div ref={containerRef} className="relative w-full h-[290px] rounded-xl overflow-hidden select-none border-2 border-neutral-200 bg-white">
      
      {!isHit ? (
        <div className="absolute inset-0" onMouseMove={handleMove} onTouchMove={handleMove} onMouseUp={handleEnd} onTouchEnd={handleEnd}>
          {/* Pitch drawing */}
          <div className="absolute bottom-16 left-6 right-6 h-4 bg-neutral-100 border-y border-neutral-200/50" />
          
          {/* Instructions */}
          <div className="absolute top-4 left-0 right-0 text-center font-spacemono text-[9px] font-bold text-neutral-400 uppercase tracking-widest px-2">
            🎯 Drag &rarr; Release &rarr; Hit the wicket
          </div>

          {/* Stumps / Exploding Wicket */}
          <div className="absolute w-8 h-16" style={{ left: wicketPos.x, top: wicketPos.y }}>
            {!explodedStumps ? (
              <svg className="w-full h-full text-neutral-900" viewBox="0 0 30 60">
                <rect x="4" y="10" width="3.5" height="50" fill="currentColor" rx="1" />
                <rect x="13" y="10" width="3.5" height="50" fill="currentColor" rx="1" />
                <rect x="22" y="10" width="3.5" height="50" fill="currentColor" rx="1" />
                <rect x="2" y="5" width="12" height="3" fill="currentColor" rx="0.5" />
                <rect x="16" y="5" width="12" height="3" fill="currentColor" rx="0.5" />
              </svg>
            ) : (
              // Scattered stump pieces
              <div className="relative w-full h-full">
                {explodedStumps.map((stump) => (
                  <motion.div
                    key={stump.id}
                    className="absolute bg-neutral-900"
                    initial={{ left: stump.x, top: stump.y, rotate: 0 }}
                    animate={{
                      left: stump.x + stump.vx * 12,
                      top: stump.y + stump.vy * 12 + 25,
                      rotate: stump.tr,
                      opacity: 0
                    }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{ width: stump.w, height: stump.h, borderRadius: '1px' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Trajectory dots helper */}
          {trajectory.map((pt, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 bg-neutral-300 rounded-full pointer-events-none" style={{ left: pt.x + 8, top: pt.y + 8 }} />
          ))}

          {/* Slingshot Rubber Band */}
          {isDragging && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <line 
                x1={initialBallPos.x + 10} 
                y1={initialBallPos.y + 10} 
                x2={ballPos.x + 10} 
                y2={ballPos.y + 10} 
                stroke="#a3a3a3" 
                strokeWidth="2.5" 
                strokeDasharray="4 2" 
              />
            </svg>
          )}

          {/* Ball */}
          <div
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{ 
              left: ballPos.x, 
              top: ballPos.y,
              transform: `rotate(${ballRotation}deg)`
            }}
            className={`absolute w-5 h-5 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-md`}
          >
            <div className="w-full h-[2px] bg-white opacity-40 rotate-[45deg]" />
          </div>

          {/* Power Bar HUD */}
          {isDragging && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-2 bg-neutral-100 border border-neutral-300 rounded-full overflow-hidden flex items-center">
              <div 
                className="h-full bg-neutral-900 transition-all" 
                style={{ width: `${powerRatio * 100}%` }} 
              />
            </div>
          )}
        </div>
      ) : (
        // Revealed Info Card
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col p-5 items-center justify-between text-center bg-neutral-50/50"
        >
          <div className="flex flex-col items-center">
            {/* Sparkles / Achievement Glow */}
            <div className="relative flex flex-col items-center">
              <div className="absolute -inset-2 bg-neutral-950/5 blur-md rounded-full animate-pulse" />
              <span className="text-xl mb-1 z-10">✨</span>
            </div>
            <img src={CERTIFICATIONS.find(c => c.id === 'freecodecamp').logo} alt="FreeCodeCamp" className="h-9 object-contain mb-1" />
            <h4 className="text-sm font-bold font-outfit text-neutral-900 uppercase">{CERTIFICATIONS.find(c => c.id === 'freecodecamp').title}</h4>
            <span className="text-[9px] font-spacemono font-bold text-neutral-400 uppercase tracking-wider">{CERTIFICATIONS.find(c => c.id === 'freecodecamp').issuer} Certification</span>
          </div>
          <p className="text-[11px] font-space leading-relaxed text-neutral-600 px-1 font-semibold">
            "{CERTIFICATIONS.find(c => c.id === 'freecodecamp').description}"
          </p>
          <a
            href={CERTIFICATIONS.find(c => c.id === 'freecodecamp').link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-[9px] font-bold text-white rounded-lg font-spacemono uppercase tracking-wider transition-colors shadow-sm cursor-pointer z-10"
          >
            {CERTIFICATIONS.find(c => c.id === 'freecodecamp').buttonText}
          </a>
        </motion.div>
      )}

    </div>
  );
};


// --- CARD 3: MINI RIDDLE LOCKBOX COMPONENT ---
const RiddleBox = ({ onUnlock }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [wrongOpt, setWrongOpt] = useState(null);
  const [confettiList, setConfettiList] = useState([]);

  const riddleOptions = [
    { label: 'A. Queue', value: 'queue' },
    { label: 'B. Stack', value: 'stack' },
    { label: 'C. Array', value: 'array' },
    { label: 'D. Linked List', value: 'linkedlist' }
  ];

  // Confetti popper loop
  useEffect(() => {
    if (confettiList.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setConfettiList(prev => 
        prev
          .map(c => ({
            ...c,
            x: c.x + (c.tx - c.x) * 0.08,
            y: c.y + (c.ty - c.y) * 0.08 + 0.9, // gravity pull downwards
            tr: c.tr + 5
          }))
          .filter(c => c.y < 290)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [confettiList]);

  const handleSelectOption = (opt) => {
    setSelectedOpt(opt.value);
    
    if (opt.value === 'stack') {
      // Trigger party poppers from both bottom corners
      const leftPopper = generateConfetti(30, 260);
      const rightPopper = generateConfetti(250, 260);
      setConfettiList([...leftPopper, ...rightPopper]);

      // Unlock chest with open animation delay
      setTimeout(() => {
        setUnlocked(true);
        onUnlock();
      }, 1000);
    } else {
      setWrongOpt(opt.value);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setSelectedOpt(null);
        setWrongOpt(null);
      }, 600);
    }
  };

  return (
    <div className={`relative w-full h-[290px] rounded-xl overflow-hidden select-none border-2 border-neutral-200 bg-white transition-all ${shake ? 'border-neutral-500' : ''}`}>
      
      {/* Party Popper Overlay */}
      {confettiList.map(c => (
        <div
          key={c.id}
          className="absolute rounded-sm pointer-events-none z-50 shadow-sm"
          style={{
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            transform: `rotate(${c.tr}deg)`
          }}
        />
      ))}

      {!unlocked ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-between p-5 text-center ${shake ? 'animate-bounce' : ''}`}>
          
          {/* Lock Header */}
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🔐</span>
            <span className="text-[10px] font-bold font-spacemono text-neutral-400 uppercase tracking-widest">LOCKED RIDDLE CHEST</span>
            <p className="text-[11px] font-spacemono text-neutral-600 font-bold max-w-xs mt-2 italic px-2">
              "I am a DS and follow LIFO"
            </p>
          </div>

          {/* Riddle Options Buttons Grid */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-[240px] mb-1">
            {riddleOptions.map((opt) => {
              const isSelected = selectedOpt === opt.value;
              const isWrong = wrongOpt === opt.value;
              
              let btnClass = "bg-white border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-50";
              if (isSelected && opt.value === 'stack') {
                btnClass = "bg-neutral-100 border-2 border-neutral-900 text-neutral-900";
              } else if (isWrong) {
                btnClass = "bg-neutral-200 border-2 border-neutral-400 text-neutral-600 animate-pulse";
              }

              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedOpt !== null}
                  className={`py-2 px-1 text-[10px] font-bold font-spacemono rounded-lg uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${btnClass}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // Unlocked details
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col p-5 items-center justify-between text-center bg-neutral-50/50"
        >
          {/* Stamp/confetti effects */}
          <div className="relative flex flex-col items-center">
            {/* Subtle radial background light */}
            <div className="absolute -inset-3 bg-neutral-950/5 blur-md rounded-full animate-pulse" />
            
            {/* SUCCESS stamp */}
            <motion.div 
              initial={{ scale: 2, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 0.9, rotate: -10 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="absolute -top-3 -right-12 border-[2.5px] border-neutral-900 text-neutral-900 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded rotate-[10deg] pointer-events-none z-20 font-spacemono"
            >
              SUCCESS
            </motion.div>
            
            <img src={CERTIFICATIONS.find(c => c.id === 'leetcode').logo} alt="LeetCode" className="h-9 object-contain mb-1" />
          </div>
          
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold font-outfit text-neutral-900 uppercase">{CERTIFICATIONS.find(c => c.id === 'leetcode').title}</h4>
            <span className="text-[9px] font-spacemono font-bold text-neutral-400 uppercase tracking-wider">{CERTIFICATIONS.find(c => c.id === 'leetcode').issuer}</span>
          </div>

          <p className="text-[11px] font-space leading-relaxed text-neutral-600 px-1 font-semibold">
            "{CERTIFICATIONS.find(c => c.id === 'leetcode').description}"
          </p>

          <a
            href={CERTIFICATIONS.find(c => c.id === 'leetcode').link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-[9px] font-bold text-white rounded-lg font-spacemono uppercase tracking-wider transition-colors shadow-sm cursor-pointer z-10"
          >
            {CERTIFICATIONS.find(c => c.id === 'leetcode').buttonText}
          </a>
        </motion.div>
      )}

    </div>
  );
};


// --- MAIN ACHIEVEMENTS COMPONENT CONTAINER ---
const Achievements = () => {
  const [unlocked, setUnlocked] = useState({
    tcs: false,
    freecodecamp: false,
    leetcode: false
  });

  const handleUnlock = (key) => {
    setUnlocked(prev => ({ ...prev, [key]: true }));
  };

  const unlockedCount = Object.values(unlocked).filter(Boolean).length;
  const isAllUnlocked = unlockedCount === 3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark fade in
      gsap.fromTo('.achievements-watermark',
        { opacity: 0, y: 40 },
        {
          opacity: 0.02,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#achievements',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 2. Trophy illustration drawing animation
      gsap.fromTo('.trophy-path',
        { strokeDasharray: 200, strokeDashoffset: 200, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2.2,
          stagger: 0.08,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '#achievements',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 3. Stamps fade & scale in
      gsap.fromTo('.achievements-stamp',
        { opacity: 0, scale: 0.75, y: 15 },
        {
          opacity: 0.03,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '#achievements',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 4. Curved connector path drawing
      gsap.fromTo('.achievements-path',
        { strokeDasharray: 150, strokeDashoffset: 150, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.03,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '#achievements',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="relative w-full py-24 px-6 md:px-12 bg-[#FAFAFA] text-neutral-900 z-10 border-t border-dashed border-neutral-200 overflow-hidden">
      {/* Layered Background System */}
      <div className="paper-texture" />
      <div className="blueprint-grid-80" />

      {/* Giant Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="achievements-watermark text-[11rem] sm:text-[16rem] md:text-[23rem] font-black font-outfit text-neutral-900 tracking-tighter uppercase leading-none select-none" style={{ opacity: 0.02 }}>
          ACHIEVEMENTS
        </div>
      </div>

      {/* Blueprint-style Trophy Line Art */}
      <svg className="absolute top-[25%] left-[10%] md:left-[15%] w-72 h-72 pointer-events-none select-none z-0 stroke-neutral-950/2 fill-none achievements-trophy hidden sm:block" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 100 100" style={{ opacity: 0.02 }}>
        {/* Main Cup */}
        <path d="M 30,25 L 70,25 L 68,50 C 68,60 58,68 50,68 C 42,68 32,60 32,50 Z" className="trophy-path" />
        {/* Left Handle */}
        <path d="M 32,30 C 22,30 22,42 32,45" className="trophy-path" />
        {/* Right Handle */}
        <path d="M 68,30 C 78,30 78,42 68,45" className="trophy-path" />
        {/* Base Stem */}
        <path d="M 50,68 L 50,82" className="trophy-path" />
        {/* Base Pedestal */}
        <path d="M 38,82 L 62,82" className="trophy-path" />
        <path d="M 30,88 L 70,88" className="trophy-path" />
        {/* Stars around the trophy */}
        <path d="M 22,20 L 24,22 L 26,20 L 25,23 L 27,25 L 24,25 L 22,27 L 23,24 Z" className="trophy-path" />
        <path d="M 78,20 L 80,22 L 82,20 L 81,23 L 83,25 L 80,25 L 78,27 L 79,24 Z" className="trophy-path" />
        {/* Measurement/Construction guidelines */}
        <line x1="50" y1="15" x2="50" y2="92" strokeDasharray="3 3" opacity="0.4" />
        <line x1="15" y1="25" x2="85" y2="25" strokeDasharray="3 3" opacity="0.4" />
        <line x1="20" y1="88" x2="80" y2="88" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="50" cy="48" r="18" strokeDasharray="4 4" opacity="0.3" />
      </svg>

      {/* Floating Architectural / Verification Stamps */}
      <div className="absolute top-[18%] left-[8%] rotate-[-12deg] select-none pointer-events-none z-0 achievements-stamp hidden md:block" style={{ opacity: 0.03 }}>
        <div className="border-[2px] border-double border-neutral-900 rounded-full w-24 h-24 flex flex-col items-center justify-center p-2 text-center text-[9px] font-black font-spacemono uppercase tracking-wider text-neutral-900 leading-none">
          <div>ORIGINAL</div>
          <div className="my-1 h-[1px] w-12 bg-neutral-900" />
          <div>CERTIFIED</div>
        </div>
      </div>

      <div className="absolute top-[15%] right-[10%] rotate-[15deg] select-none pointer-events-none z-0 achievements-stamp hidden md:block" style={{ opacity: 0.03 }}>
        <div className="border-2 border-dashed border-neutral-900 rounded-lg px-3 py-2 text-[10px] font-black font-spacemono uppercase tracking-widest text-neutral-900">
          ✓ COMPLETED
        </div>
      </div>

      <div className="absolute bottom-[25%] left-[4%] rotate-[8deg] select-none pointer-events-none z-0 achievements-stamp hidden md:block" style={{ opacity: 0.03 }}>
        <div className="border-[2px] border-double border-neutral-900 rounded-full px-4 py-1.5 text-[9px] font-black font-spacemono uppercase tracking-widest text-neutral-900 flex items-center gap-1">
          <span>🛡️</span> VERIFIED
        </div>
      </div>

      <div className="absolute bottom-[20%] right-[6%] rotate-[-10deg] select-none pointer-events-none z-0 achievements-stamp hidden md:block" style={{ opacity: 0.03 }}>
        <div className="border-2 border-neutral-900 rounded-none px-3 py-1.5 text-[9px] font-black font-spacemono uppercase tracking-widest text-neutral-900 leading-none">
          CODE_UNLOCKED
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mb-14 space-y-3 select-none">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 font-spacemono">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-wider text-neutral-900">
            Certifications
          </h2>
          <p className="text-neutral-500 font-semibold text-xs sm:text-sm leading-relaxed font-space">
            Every achievement tells a story. Discover them by interacting.
          </p>
        </div>

        {/* Progress Tracker Widget - Increased vertical margin for spacing */}
        <div className="mb-14 text-center font-spacemono select-none">
          <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest block mb-3.5">
            {isAllUnlocked ? '🏆 All Achievements Discovered' : 'Unlock All 3 Achievements'}
          </span>
          
          {/* Tracker circles */}
          <div className="flex items-center justify-center gap-3.5 text-xl font-bold">
            <span className={unlocked.tcs ? 'text-neutral-900' : 'text-neutral-200'}>
              {unlocked.tcs ? '●' : '○'}
            </span>
            <span className={unlocked.freecodecamp ? 'text-neutral-900' : 'text-neutral-200'}>
              {unlocked.freecodecamp ? '●' : '○'}
            </span>
            <span className={unlocked.leetcode ? 'text-neutral-900' : 'text-neutral-200'}>
              {unlocked.leetcode ? '●' : '○'}
            </span>
          </div>

          {/* Self-drawing SVG Trophy on all-unlocked state */}
          {isAllUnlocked && (
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mt-6 flex flex-col items-center"
            >
              <svg className="w-14 h-14 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                  d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a7 7 0 0 0-7 7c0 3.18 2.12 5.86 5 6.71V2h2z"
                />
              </svg>
              {/* Handwritten note style sublabel */}
              <span className="font-cabin text-base font-bold text-neutral-800 tracking-wide mt-2 block animate-pulse">
                🏆 Discovery Complete!
              </span>
            </motion.div>
          )}

          {/* Handwritten Style Instructions under Tracker */}
          {!isAllUnlocked && (
            <div className="font-cabin text-sm font-semibold text-neutral-500 tracking-wide mt-5 italic flex items-center justify-center gap-1.5 animate-bounce">
              <span>↓ Unlock all 3 achievements</span>
            </div>
          )}
        </div>

        {/* Responsive Grid Cards Wrapper */}
        <div className="relative w-full z-10">
          {/* Dotted connector paths between cards (visible on md screens and up) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-neutral-950 fill-none hidden md:block" viewBox="0 0 960 350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.03 }}>
            {/* Card 1 to Card 2 connector */}
            <path d="M 280,150 C 340,110 380,210 440,150" className="achievements-path" strokeDasharray="5 5" />
            <path d="M 425,145 L 440,150 L 435,135" strokeDasharray="none" className="achievements-path" />

            {/* Card 2 to Card 3 connector */}
            <path d="M 600,150 C 660,110 700,210 760,150" className="achievements-path" strokeDasharray="5 5" />
            <path d="M 745,145 L 760,150 L 755,135" strokeDasharray="none" className="achievements-path" />
          </svg>

          {/* Responsive Grid Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10">
            
            {/* Card 1 - TCS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={cardVariants(!unlocked.tcs)}
              whileHover="hover"
              className="flex flex-col p-4 bg-neutral-50/90 border-[3px] border-neutral-900 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative overflow-visible z-10"
            >
              {/* Spotlight behind Card */}
              <div 
                className="absolute -inset-8 bg-neutral-950 rounded-full blur-[60px] pointer-events-none select-none z-[-1] transition-opacity duration-700 achievements-spotlight" 
                style={{ opacity: unlocked.tcs ? 0.06 : 0.02 }} 
              />
              <h3 className="font-outfit text-xs font-bold tracking-widest text-neutral-400 mb-3 select-none font-spacemono uppercase z-10">
                {unlocked.tcs ? '🔓 TCS AI FOR ALL' : '🔒 TCS AI FOR ALL'}
              </h3>
              <ScratchCard onUnlock={() => handleUnlock('tcs')} />
            </motion.div>

            {/* Card 2 - FreeCodeCamp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={cardVariants(!unlocked.freecodecamp)}
              whileHover="hover"
              className="flex flex-col p-4 bg-neutral-50/90 border-[3px] border-neutral-900 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative overflow-visible z-10"
            >
              {/* Spotlight behind Card */}
              <div 
                className="absolute -inset-8 bg-neutral-950 rounded-full blur-[60px] pointer-events-none select-none z-[-1] transition-opacity duration-700 achievements-spotlight" 
                style={{ opacity: unlocked.freecodecamp ? 0.06 : 0.02 }} 
              />
              <h3 className="font-outfit text-xs font-bold tracking-widest text-neutral-400 mb-3 select-none font-spacemono uppercase z-10">
                {unlocked.freecodecamp ? '🔓 FCC WEB DESIGN' : '🔒 FCC WEB DESIGN'}
              </h3>
              <CricketGame onUnlock={() => handleUnlock('freecodecamp')} />
            </motion.div>

            {/* Card 3 - LeetCode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={cardVariants(!unlocked.leetcode)}
              whileHover="hover"
              className="flex flex-col p-4 bg-neutral-50/90 border-[3px] border-neutral-900 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative overflow-visible z-10"
            >
              {/* Spotlight behind Card */}
              <div 
                className="absolute -inset-8 bg-neutral-950 rounded-full blur-[60px] pointer-events-none select-none z-[-1] transition-opacity duration-700 achievements-spotlight" 
                style={{ opacity: unlocked.leetcode ? 0.06 : 0.02 }} 
              />
              <h3 className="font-outfit text-xs font-bold tracking-widest text-neutral-400 mb-3 select-none font-spacemono uppercase z-10">
                {unlocked.leetcode ? '🔓 LEETCODE SOLVED' : '🔒 LEETCODE SOLVED'}
              </h3>
              <RiddleBox onUnlock={() => handleUnlock('leetcode')} />
            </motion.div>

          </div>
        </div>

        {/* View All Button below the grid */}
        <div className="w-full flex justify-center mt-16 select-none">
          <button
            onClick={() => window.location.hash = '#all-certifications'}
            className="px-8 py-3 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold font-spacemono uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95 cursor-pointer outline-none focus:outline-none hover:shadow-lg"
          >
            View all
          </button>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
