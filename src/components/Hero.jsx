import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <header className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-neutral-950/90" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Configure real BMW models in real time
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Pick a BMW model and swap between authentic wheel styles with smooth, animated transitions.
          </p>
        </div>
      </div>
    </header>
  );
}
