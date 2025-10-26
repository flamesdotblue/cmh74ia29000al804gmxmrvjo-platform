export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-white/60 text-sm">
        <p>© {new Date().getFullYear()} Live Auto Configurator</p>
        <p className="mt-2 sm:mt-0">Built with React, Tailwind, Framer Motion & Spline</p>
      </div>
    </footer>
  );
}
