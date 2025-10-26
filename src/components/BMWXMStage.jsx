import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HAGERTY_ARTICLE = 'https://hagerty.com/media/design/vision-thing-is-the-xm-concept-a-sign-of-bmws-downward-spiral';
const JINA_PROXY = 'https://r.jina.ai/http/';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop';

const WHEEL_SIZE = 74;

function rimPath(type) {
  switch (type) {
    case 'bmw_825m':
      return (
        <g>
          <circle cx="0" cy="0" r="25" fill="#dfe3e8" />
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d="M0 -23 L-4 -12 C-2 -7, -2 -3, 0 -1 L0 0 L0 -1 C2 -3, 2 -7, 4 -12 L0 -23 Z"
              fill="#0d1323"
              transform={`rotate(${(360 / 10) * i})`}
              opacity="0.95"
            />
          ))}
        </g>
      );
    case 'bmw_740m':
      return (
        <g>
          <circle cx="0" cy="0" r="25" fill="#e9edf2" />
          {[...Array(5)].map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 5) * i})`}>
              <path d="M0 -23 L-2 -10 L0 -8 L2 -10 Z" fill="#0e162a" />
              <path d="M0 -23 L-1 -11 L1 -11 Z" fill="#2b3752" opacity="0.8" />
            </g>
          ))}
        </g>
      );
    case 'bbs_lm':
      return (
        <g>
          <circle cx="0" cy="0" r="25" fill="#f0f2f5" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="#b8c0cc" strokeWidth="1.5" />
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d="M0 -21 C2 -20, 3 -17, 0 -14 C-3 -17, -2 -20, 0 -21 Z"
              fill="#101722"
              transform={`rotate(${(360 / 20) * i})`}
              opacity="0.95"
            />
          ))}
        </g>
      );
    case 'aero_turbine':
      return (
        <g>
          <circle cx="0" cy="0" r="25" fill="#d6dbe3" />
          {[...Array(9)].map((_, i) => (
            <path
              key={i}
              d="M0 -25 C7 -21, 7 -10, 0 -6 C-7 -10, -7 -21, 0 -25 Z"
              fill="#0b1222"
              transform={`rotate(${(360 / 9) * i})`}
              opacity="0.9"
            />
          ))}
        </g>
      );
    default:
      return (
        <g>
          <circle cx="0" cy="0" r="25" fill="#e5e7eb" />
          {[...Array(5)].map((_, i) => (
            <rect key={i} x="-2" y="-18" width="4" height="14" rx="2" fill="#111827" transform={`rotate(${(360 / 5) * i})`} />
          ))}
        </g>
      );
  }
}

const wheelVariants = {
  initial: { opacity: 0, scale: 0.88, rotate: -50 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 1.08, rotate: 40, transition: { duration: 0.22 } },
};

function WheelFace({ type }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.g key={type} variants={wheelVariants} initial="initial" animate="animate" exit="exit">
        {rimPath(type)}
        <circle cx="0" cy="0" r="3.8" fill="#0b1222" />
      </motion.g>
    </AnimatePresence>
  );
}

function WheelPortal({ xPct, yPct, type }) {
  // xPct/yPct are percentages relative to the stage container
  return (
    <div
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-sm"
    >
      <svg viewBox="-40 -40 80 80" className="h-[88px] w-[88px]">
        <defs>
          <radialGradient id="tireXM" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#0b0f19" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r={WHEEL_SIZE / 2} fill="#0a0a0a" />
        <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 4} fill="url(#tireXM)" />
        <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 9} fill="#1f2937" />
        <WheelFace type={type} />
      </svg>
    </div>
  );
}

export default function BMWXMStage({ wheel }) {
  const containerRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(FALLBACK_IMG);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let active = true;
    async function resolveImage() {
      try {
        const res = await fetch(JINA_PROXY + HAGERTY_ARTICLE);
        const text = await res.text();
        // Try to find og:image or first prominent jpg/png
        const ogMatch = text.match(/og:image\"\s*content=\"([^\"]+)/i) || text.match(/content=\"([^\"]+)\"\s*property=\"og:image/i);
        const url = ogMatch?.[1];
        if (active && url) setImgUrl(url);
        // If not found, try a generic <img ... src="...">
        if (active && !url) {
          const imgMatch = text.match(/<img[^>]+src=\"([^\"]+\.(?:jpg|jpeg|png|webp))\"/i);
          if (imgMatch?.[1]) setImgUrl(imgMatch[1]);
        }
      } catch (e) {
        // use fallback silently
      }
    }
    resolveImage();
    return () => {
      active = false;
    };
  }, []);

  const motionValues = useMemo(() => {
    const rotX = (mouse.y - 0.5) * -6; // tilt up/down
    const rotY = (mouse.x - 0.5) * 8; // tilt left/right
    const scale = hovered ? 1.02 : 1.0;
    return { rotX, rotY, scale };
  }, [mouse, hovered]);

  return (
    <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/5 relative">
      <motion.div
        ref={containerRef}
        className="relative h-full w-full"
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setMouse({ x: 0.5, y: 0.5 });
        }}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          setMouse({ x, y });
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            rotateX: motionValues.rotX,
            rotateY: motionValues.rotY,
            scale: motionValues.scale,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src={imgUrl}
            alt="BMW XM Concept"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.06, x: '-1%', y: '-1%' }}
            animate={{ scale: hovered ? 1.08 : 1.04, x: hovered ? '0%' : '-1%', y: hovered ? '0%' : '-1%' }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            style={{ transform: 'translateZ(0)' }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 pointer-events-none" />

          {/* Wheel portals aligned approximately for a side profile; tweak percentages as needed */}
          <WheelPortal xPct={28} yPct={72} type={wheel.id} />
          <WheelPortal xPct={72} yPct={72} type={wheel.id} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-white/5 bg-neutral-900/40 backdrop-blur flex items-center justify-between text-sm text-white/80">
        <div className="flex items-center gap-2">
          <span className="font-medium">BMW XM (Image: Hagerty)</span>
        </div>
        <a href={HAGERTY_ARTICLE} target="_blank" rel="noreferrer" className="underline decoration-white/30 hover:decoration-white/70">Source</a>
      </div>
    </div>
  );
}
