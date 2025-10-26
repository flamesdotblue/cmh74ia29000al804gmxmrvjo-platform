import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHEEL_SIZE = 74; // diameter in svg units for a more realistic proportion

// Wheel face drawings approximating real patterns
function rimPath(type) {
  switch (type) {
    case 'bmw_825m':
      // M Double-spoke 825M (split Y-spoke look)
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
      // Star-spoke 740M (star pattern with thin split)
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
      // BBS LM mesh-style
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
      // Aero turbine style
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

function Wheel({ x, y, type, tireColor = '#0a0a0a' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Tire */}
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2} fill={tireColor} />
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 4} fill="#0f172a" />
      <circle cx="0" cy="0" r={WHEEL_SIZE / 2 - 9} fill="#1f2937" />

      {/* Animated rim */}
      <AnimatePresence mode="popLayout">
        <motion.g key={type} variants={wheelVariants} initial="initial" animate="animate" exit="exit">
          {rimPath(type)}
          <circle cx="0" cy="0" r="3.8" fill="#0b1222" />
        </motion.g>
      </AnimatePresence>
    </g>
  );
}

function BMWBody({ model, color }) {
  // Stylized side profiles inspired by BMW silhouettes
  if (model === 'bmw_xm') {
    // BMW XM: muscular SUV, high beltline, pronounced rear
    return (
      <g>
        <path d="M60 105 C90 85, 140 70, 210 70 C270 70, 320 75, 360 90 C390 100, 410 108, 430 112 L430 120 L90 120 L60 114 Z" fill={color} />
        <rect x="80" y="112" width="360" height="28" rx="10" fill={color} />
        {/* Greenhouse */}
        <path d="M150 92 C200 72, 305 72, 360 90 L360 102 L150 102 Z" fill="#62b2ff" opacity="0.9" />
        {/* Details */}
        <rect x="82" y="122" width="22" height="6" rx="3" fill="#0f172a" opacity="0.6" />
        <rect x="410" y="120" width="16" height="8" rx="3" fill="#0f172a" opacity="0.6" />
      </g>
    );
  }
  if (model === 'bmw_coupe') {
    // BMW 4 Series Coupe: sweeping roofline
    return (
      <g>
        <path d="M70 120 L90 112 C140 95, 240 78, 345 90 C365 92, 380 95, 405 103 L405 116 L90 116 Z" fill={color} />
        <rect x="75" y="116" width="345" height="22" rx="10" fill={color} />
        {/* Greenhouse */}
        <path d="M150 102 C210 80, 300 80, 355 96 L355 106 L150 106 Z" fill="#9bd7ff" opacity="0.9" />
        {/* Details */}
        <rect x="78" y="124" width="18" height="5" rx="2.5" fill="#0f172a" opacity="0.6" />
        <rect x="392" y="122" width="14" height="7" rx="3" fill="#0f172a" opacity="0.6" />
      </g>
    );
  }
  // bmw_sedan
  return (
    <g>
      <path d="M70 120 L95 110 C150 90, 255 85, 330 98 C360 103, 380 110, 400 116 L400 120 Z" fill={color} />
      <rect x="70" y="116" width="340" height="22" rx="10" fill={color} />
      {/* Greenhouse */}
      <path d="M150 100 C205 85, 295 86, 345 98 L345 108 L150 108 Z" fill="#7dcfff" opacity="0.9" />
      {/* Details */}
      <rect x="72" y="124" width="18" height="5" rx="2.5" fill="#0f172a" opacity="0.6" />
      <rect x="386" y="122" width="14" height="7" rx="3" fill="#0f172a" opacity="0.6" />
    </g>
  );
}

function getModelSpec(id) {
  switch (id) {
    case 'bmw_xm':
      return { wheelbase: 240, frontX: 150, rearX: 390, baseY: 148 };
    case 'bmw_coupe':
      return { wheelbase: 215, frontX: 160, rearX: 375, baseY: 155 };
    case 'bmw_sedan':
    default:
      return { wheelbase: 220, frontX: 155, rearX: 375, baseY: 155 };
  }
}

function CarStageBase({ model, wheel }) {
  const spec = useMemo(() => getModelSpec(model.id), [model.id]);

  return (
    <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-b from-neutral-800/60 to-neutral-900/60 border border-white/5">
      <svg viewBox="0 0 500 240" className="h-full w-full">
        {/* Background track */}
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b0f19" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="240" fill="url(#road)" />
        <rect x="0" y="185" width="500" height="55" fill="#0f172a" />
        <rect x="0" y="183" width="500" height="4" fill="#1f2937" opacity="0.6" />

        {/* Car shadow */}
        <ellipse cx="250" cy="178" rx="150" ry="16" fill="#000" opacity="0.28" />

        {/* Car body */}
        <BMWBody model={model.id} color={model.color} />

        {/* Wheels positioned by spec */}
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
