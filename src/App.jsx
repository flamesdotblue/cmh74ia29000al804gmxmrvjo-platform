import { useState } from 'react';
import Hero from './components/Hero';
import CarStage from './components/CarStage';
import ConfigPanel from './components/ConfigPanel';
import Footer from './components/Footer';

const MODELS = [
  { id: 'sedan', name: 'Sedan', color: '#2563eb', body: 'sedan' },
  { id: 'suv', name: 'SUV', color: '#ef4444', body: 'suv' },
  { id: 'coupe', name: 'Coupe', color: '#8b5cf6', body: 'coupe' },
];

const WHEELS = [
  { id: 'classic', name: 'Classic 5-Spoke' },
  { id: 'sport', name: 'Sport Star' },
  { id: 'aero', name: 'Aero Turbine' },
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
