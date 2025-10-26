import { motion } from 'framer-motion';

export default function ConfigPanel({ models, wheels, selectedModel, selectedWheel, onModelChange, onWheelChange }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur p-4 sm:p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Select Model</h2>
        <div className="grid grid-cols-3 gap-3">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{w.name}</div>
                    <div className="text-xs text-white/60">{w.id}</div>
                  </div>
                  <WheelPreview type={w.id} active={active} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-white/70 text-sm">
        Tip: Click different wheel styles to see them transition smoothly on the car in real time.
      </div>
    </div>
  );
}

function WheelPreview({ type, active }) {
  return (
    <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-b from-neutral-700 to-neutral-800 grid place-items-center">
      <svg viewBox="0 0 60 60" className="h-10 w-10">
        <defs>
          <radialGradient id="tire" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#0b0f19" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#tire)" />
        <motion.g
          initial={{ scale: 0.9, rotate: -30, opacity: 0.8 }}
          animate={{ scale: active ? 1 : 0.95, rotate: active ? 0 : -15, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          transform="translate(30,30)"
        >
          {type === 'sport' && (
            <>
              <circle cx="0" cy="0" r="10" fill="#e5e7eb" />
              {[...Array(8)].map((_, i) => (
                <path key={i} d="M0 -10 L0 -20" stroke="#0f172a" strokeWidth="2" transform={`rotate(${(360 / 8) * i})`} />
              ))}
            </>
          )}
          {type === 'aero' && (
            <>
              <circle cx="0" cy="0" r="11" fill="#d1d5db" />
              {[...Array(8)].map((_, i) => (
                <path key={i} d="M0 -11 C3 -9 3 -5 0 -3 C-3 -5 -3 -9 0 -11 Z" fill="#111827" transform={`rotate(${(360 / 8) * i})`} />
              ))}
            </>
          )}
          {type === 'classic' && (
            <>
              <circle cx="0" cy="0" r="10" fill="#f3f4f6" />
              {[...Array(5)].map((_, i) => (
                <rect key={i} x="-1.5" y="-9" width="3" height="8" rx="1.5" fill="#111827" transform={`rotate(${(360 / 5) * i})`} />
              ))}
            </>
          )}
        </motion.g>
      </svg>
    </div>
  );
}
