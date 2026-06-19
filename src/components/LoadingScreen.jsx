import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Sketching U, 1: Sketching M, 2: Dev, 3: Freelancer, 4: Builder, 5: Finished

  useEffect(() => {
    // Stage timings
    const t1 = setTimeout(() => setStep(1), 1200); // Start M
    const t2 = setTimeout(() => setStep(2), 2400); // Show "Developer"
    const t3 = setTimeout(() => setStep(3), 3200); // Show "Freelancer"
    const t4 = setTimeout(() => setStep(4), 4000); // Show "Builder"
    const t5 = setTimeout(() => {
      setStep(5);
      // Let the fadeout animation run before completing
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Framer Motion SVG path drawing variants
  const pathVariants = {
    hidden: { strokeDasharray: 300, strokeDashoffset: 300 },
    visible: {
      strokeDashoffset: 0,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white select-none"
        >
          {/* Draft Grid Paper texture */}
          <div className="draft-grid" />
          
          {/* Sketchy Logo Drawing */}
          <div className="relative z-10 flex items-center justify-center w-64 h-64 border border-dashed border-neutral-800 rounded-lg p-8 bg-[#0a0a0a]/50 backdrop-blur-xs wobble-sketch">
            <svg
              width="180"
              height="120"
              viewBox="0 0 180 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* U Path 1 (Pencil core stroke) */}
              <motion.path
                d="M 30,25 C 30,25 28,85 32,90 C 36,95 62,97 66,90 C 70,83 68,25 68,25"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate={step >= 0 ? "visible" : "hidden"}
              />
              {/* U Path 2 (Sketch overlay jittered retrace) */}
              <motion.path
                d="M 32,27 C 32,27 29,82 33,88 C 37,93 60,95 64,88 C 68,81 66,27 66,27"
                stroke="rgba(191, 191, 191, 0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                animate={step >= 0 ? "visible" : "hidden"}
              />

              {/* M Path 1 (Pencil core stroke) */}
              {step >= 1 && (
                <motion.path
                  d="M 95,90 L 95,25 C 95,25 110,70 115,70 C 120,70 135,25 135,25 L 135,90"
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}
              {/* M Path 2 (Sketch overlay jittered retrace) */}
              {step >= 1 && (
                <motion.path
                  d="M 97,88 L 97,27 C 97,27 111,68 115,68 C 119,68 133,27 133,27 L 133,88"
                  stroke="rgba(191, 191, 191, 0.6)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}

              {/* Blueprint details */}
              <line x1="10" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="30" y1="10" x2="30" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="135" y1="10" x2="135" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Job titles text */}
          <div className="relative z-10 h-12 mt-8 flex flex-col items-center justify-center font-cabin text-xl tracking-wider text-neutral-400">
            <AnimatePresence mode="wait">
              {step === 2 && (
                <motion.div
                  key="developer"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-white text-2xl font-bold flex items-center gap-2"
                >
                  <span className="opacity-50 font-sans">✎</span> Developer
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="freelancer"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-white text-2xl font-bold flex items-center gap-2"
                >
                  <span className="opacity-50 font-sans">✎</span> Freelancer
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="builder"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-white text-2xl font-bold flex items-center gap-2"
                >
                  <span className="opacity-50 font-sans">✎</span> Builder
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
