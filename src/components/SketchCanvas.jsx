import { useEffect, useRef, useState } from 'react';

const SketchCanvas = () => {
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile to hide custom cursor (touch screens do not have cursors)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="custom-cursor">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: 'translate(-2px, -26px) rotate(-15deg)', // Aligns pencil tip with pointer hotspot
          filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.5))'
        }}
      >
        {/* Pencil body */}
        <path
          d="M8 20 L26 2 L28 4 L10 22 Z"
          fill="#d6d6d6"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Pencil wood transition */}
        <path
          d="M4 16 L8 20 L10 22 L6 22 L4 20 Z"
          fill="#c29970"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        {/* Pencil lead tip */}
        <path
          d="M0 28 L4 20 L8 24 Z"
          fill="#3a3a3a"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Lead core details */}
        <path d="M0 28 L2 24 L4 26 Z" fill="#111111" />
      </svg>
    </div>
  );
};

export default SketchCanvas;
