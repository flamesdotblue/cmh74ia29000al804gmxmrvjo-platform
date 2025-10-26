import { motion } from 'framer-motion';

export default function ConfigPanel({ models, wheels, selectedModel, selectedWheel, onModelChange, onWheelChange }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur p-4 sm:p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Select Model</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {models.map((m) => {
            const active = m.id === selectedModel.id;
            return (
              <button
                key={m.id}
                onClick={() => onModelChange(m)}
                className={`relative rounded-xl border transition-colors px-3 py-3 text-left group ${
                  active ? 'border-cyan-400/40 bg-cyan-400/10' : 'border-white/10 hover:border-white/20 bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full" style={{ background: m.color }} />
                  <span className="font-medium">{m.name}</span>
                </div>
                <div className="mt-2 h-[3px] w-full rounded bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    style={{ originX: 0 }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur p-4 sm:p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Choose Wheels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {wheels.map((w) => {
            const active = w.id === selectedWheel.id;
            return (
              <button
                key={w.id}
                onClick={() => onWheelChange(w)}
                className={`group relative rounded-xl border px-3 py-3 text-left transition-colors ${
                  active ? 'border-cyan-400/40 bg-cyan-400/10' : 'border-white/10 hover:border-white/20 bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{w.name}</div>
                    <div className="text-xs text-white/60">{labelForWheel(w.id)}</div>
                  </div>
                  <WheelPreview type={w.id} active={active} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-white/70 text-sm">
        Tip: Toggle between BMW wheel styles to see the rims morph smoothly on the selected model.
      </div>
    </div>
  );
}

function labelForWheel(id) {
  switch (id) {
    case 'bmw_825m':
      return 'M Double-spoke';
    case 'bmw_740m':
      return 'Star-spoke';
    case 'bbs_lm':
      return 'Mesh-style classic';
    case 'aero_turbine':
      return 'Aero turbine';
    default:
      return id;
  }
}

function WheelPreview({ type, active }) {
  return (
    <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-800 grid place-items-center">
      <svg viewBox="0 0 60 60" className="h-10 w-10">
        <defs>
          <radialGradient id="tirePrev" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#0b0f19" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#tirePrev)" />
        <motion.g
          initial={{ scale: 0.9, rotate: -30, opacity: 0.85 }}
          animate={{ scale: active ? 1 : 0.96, rotate: active ? 0 : -12, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          transform="translate(30,30)"
        >
          {rimMini(type)}
        </motion.g>
      </svg>
    </div>
  );
}

function rimMini(type) {
  if (type === 'bmw_825m') {
    return (
      <g>
        <circle cx="0" cy="0" r="10.5" fill="#e6eaef" />
        {[...Array(10)].map((_, i) => (
          <path key={i} d="M0 -9 L-1.2 -5 C-0.6 -3, -0.4 -1.3, 0 -0.6 L0 0 L0 -0.6 C0.4 -1.3, 0.6 -3, 1.2 -5 L0 -9 Z" fill="#0f172a" transform={`rotate(${(360 / 10) * i})`} />
        ))}
      </g>
    );
  }
  if (type === 'bmw_740m') {
    return (
      <g>
        <circle cx="0" cy="0" r="10.5" fill="#f0f2f5" />
        {[...Array(5)].map((_, i) => (
          <g key={i} transform={`rotate(${(360 / 5) * i})`}>
            <path d="M0 -9 L-0.8 -4.3 L0 -3.5 L0.8 -4.3 Z" fill="#0e162a" />
          </g>
        ))}
      </g>
    );
  }
  if (type === 'bbs_lm') {
    return (
      <g>
        <circle cx="0" cy="0" r="10.5" fill="#f0f2f5" />
        <circle cx="0" cy="0" r="10" fill="none" stroke="#b8c0cc" strokeWidth="0.8" />
        {[...Array(12)].map((_, i) => (
          <path key={i} d="M0 -9 C0.9 -8.5, 1.2 -7.2, 0 -6 C-1.2 -7.2, -0.9 -8.5, 0 -9 Z" fill="#0f172a" transform={`rotate(${(360 / 12) * i})`} />
        ))}
      </g>
    );
  }
  // aero
  return (
    <g>
      <circle cx="0" cy="0" r="10.5" fill="#e1e5ec" />
      {[...Array(7)].map((_, i) => (
        <path key={i} d="M0 -10.5 C2.8 -9, 2.8 -4.2, 0 -2.6 C-2.8 -4.2, -2.8 -9, 0 -10.5 Z" fill="#0b1222" transform={`rotate(${(360 / 7) * i})`} />
      ))}
    </g>
  );
}
