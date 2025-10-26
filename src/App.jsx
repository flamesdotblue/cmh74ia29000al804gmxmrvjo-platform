import { useState } from 'react';
import Hero from './components/Hero';
import CarStage from './components/CarStage';
import ConfigPanel from './components/ConfigPanel';
import Footer from './components/Footer';

const MODELS = [
  { id: 'bmw_sedan', name: 'BMW 3 Series Sedan', color: '#1e40af' },
  { id: 'bmw_coupe', name: 'BMW 4 Series Coupe', color: '#7c3aed' },
  { id: 'bmw_xm', name: 'BMW XM (SUV)', color: '#dc2626' },
];

const WHEELS = [
  { id: 'bmw_825m', name: 'BMW M Double-spoke 825M' },
  { id: 'bmw_740m', name: 'BMW Star-spoke 740M' },
  { id: 'bbs_lm', name: 'BBS LM' },
  { id: 'aero_turbine', name: 'Aero Turbine' },
];

export default function App() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEELS[0]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur p-4 sm:p-6 shadow-xl">
            <CarStage model={selectedModel} wheel={selectedWheel} />
          </div>

          <div className="lg:col-span-5">
            <ConfigPanel
              models={MODELS}
              wheels={WHEELS}
              selectedModel={selectedModel}
              selectedWheel={selectedWheel}
              onModelChange={setSelectedModel}
              onWheelChange={setSelectedWheel}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
