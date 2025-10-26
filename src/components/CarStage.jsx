import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHEEL_SIZE = 68; // diameter in svg units

function rimPath(type) {
  switch (type) {
    case 'sport':
      return (
        <>
          <circle cx="0" cy="0" r="22" fill="#e5e7eb" />
          <g stroke="#0f172a" strokeWidth="2" strokeLinecap="round">
            <path d="M0 -22 L0 -34" />
            <path d="M0 22 L0 34" />
            <path d="M-22 0 L-34 0" />
            <path d="M22 0 L34 0" />
            <path d="M-15 -15 L-24 -24" />
            <path d="M15 15 L24 24" />
            <path d="M-15 15 L-24 24" />
            <path d="M15 -15 L24 -24" />
          </g>
        </>
      );
    case 'aero':
      return (
        <>
          <circle cx="0" cy="0" r="24" fill="#d1d5db" />
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d="M0 -24 C6 -20 6 -8 0 -4 C-6 -8 -6 -20 0 -24 Z"
              fill="#111827"
              transform={`rotate(${(360 / 8) * i})`}
              opacity="0.9"
            />
          ))}
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <circle cx="0" cy="0" r="22" fill="#f3f4f6" />
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x="-2"
              y="-18"
              width="4"
              height="14"
              rx="2"
              fill="#111827"
              transform={`rotate(${(360 / 5) * i})`}
            />
          ))}
        </>
      );
  }
}

const wheelVariants = {
  initial: { opacity: 0, scale: 0.85, rotate: -45 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 1.1, rotate: 45, transition: { duration: 0.25 } },
};

function Wheel({ x, y, type, color = '#0a0a0a' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Tire */}
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2} fill={color} />
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 4} fill="#111827" />
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 8} fill="#1f2937" />

      {/* Animated rim */}
      <AnimatePresence mode="popLayout">
        <motion.g key={type} variants={wheelVariants} initial="initial" animate="animate" exit="exit">
          {rimPath(type)}
          <circle cx="0" cy="0" r="3.5" fill="#0f172a" />
        </motion.g>
      </AnimatePresence>
    </g>
  );
}

function Body({ model, bodyColor }) {
  // Simple stylized bodies
  if (model === 'suv') {
    return (
      <g>
        <rect x="60" y="70" width="380" height="60" rx="14" fill={bodyColor} />
        <rect x="120" y="40" width="200" height="48" rx="10" fill={bodyColor} />
        <rect x="330" y="54" width="80" height="34" rx="8" fill={bodyColor} />
        <rect x="160" y="48" width="80" height="30" rx="6" fill="#0ea5e9" opacity="0.9" />
        <rect x="250" y="48" width="60" height="30" rx="6" fill="#0ea5e9" opacity="0.9" />
      </g>
    );
  }
  if (model === 'coupe') {
    return (
      <g>
        <rect x="70" y="80" width="360" height="52" rx="12" fill={bodyColor} />
        <path d="M120 80 C180 30, 300 30, 370 80 Z" fill={bodyColor} />
        <rect x="190" y="56" width="80" height="24" rx="6" fill="#38bdf8" opacity="0.9" />
      </g>
    );
  }
  // sedan default
  return (
    <g>
      <rect x="60" y="80" width="380" height="50" rx="12" fill={bodyColor} />
      <path d="M130 80 C180 50, 290 50, 360 80 Z" fill={bodyColor} />
      <rect x="190" y="60" width="80" height="22" rx="6" fill="#7dd3fc" opacity="0.9" />
      <rect x="280" y="60" width="50" height="22" rx="6" fill="#7dd3fc" opacity="0.9" />
    </g>
  );
}

function getModelSpec(id) {
  switch (id) {
    case 'suv':
      return { wheelbase: 240, frontX: 150, rearX: 150 + 240, baseY: 140 };
    case 'coupe':
      return { wheelbase: 210, frontX: 160, rearX: 160 + 210, baseY: 140 };
    case 'sedan':
    default:
      return { wheelbase: 220, frontX: 155, rearX: 155 + 220, baseY: 140 };
  }
}

function CarStageBase({ model, wheel }) {
  const spec = useMemo(() => getModelSpec(model.id), [model.id]);

  return (
    <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-b from-neutral-800/60 to-neutral-900/60 border border-white/5">
      <svg viewBox="0 0 500 220" className="h-full w-full">
        {/* Background track */}
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b0f19" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="220" fill="url(#road)" />
        <rect x="0" y="170" width="500" height="50" fill="#0f172a" />
        <rect x="0" y="168" width="500" height="4" fill="#1f2937" opacity="0.6" />

        {/* Car shadow */}
        <ellipse cx="250" cy="162" rx="140" ry="14" fill="#000" opacity="0.25" />

        {/* Car body */}
        <Body model={model.id} bodyColor={model.color} />

        {/* Wheels */}
        <Wheel x={spec.frontX} y={spec.baseY} type={wheel.id} />
        <Wheel x={spec.rearX} y={spec.baseY} type={wheel.id} />
      </svg>

      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-sm text-white/80">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: model.color }} />
          <span className="font-medium">{model.name}</span>
        </div>
        <div className="opacity-80">{wheel.name}</div>
      </div>
    </div>
  );
}

export default memo(CarStageBase);
