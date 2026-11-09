import React, { useState, useEffect, useRef } from 'react';
import { Microscope, Sparkles, Droplets, RotateCcw, ShieldCheck, Scale, Compass, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface CrystalSpec {
  id: string;
  name: string;
  tagline: string;
  granulometry: string; // e.g. "0.2 - 0.8 mm"
  structure: string;
  dissolutionTime: string; // e.g. "1.8 seg (Instantâneo)"
  dissolutionSeconds: number;
  naclPurity: string;
  iodineLevel: string;
  minerals: { name: string; amount: string; pct: number }[];
  culinaryUse: string;
  recommendedPhoto: string;
  crystalShape: 'pyramid' | 'fine-cube' | 'coarse-poly' | 'pink-facet';
}

const CRYSTAL_SPECS: CrystalSpec[] = [
  {
    id: 'flor-de-sal',
    name: 'Flor de Sal em Pirâmide',
    tagline: 'Cristais ocos flutuantes colhidos manualmente na cúspide das águas de Benguela',
    granulometry: '2.0 – 4.5 mm',
    structure: 'Pirâmides ocas e placas laminares translúcidas',
    dissolutionTime: 'Lenta no palato (crocância persistente)',
    dissolutionSeconds: 8.5,
    naclPurity: '99.4%',
    iodineLevel: '45 mg/kg (MINSA)',
    minerals: [
      { name: 'Magnésio (Mg²⁺)', amount: '0.42%', pct: 85 },
      { name: 'Cálcio (Ca²⁺)', amount: '0.28%', pct: 70 },
      { name: 'Potássio (K⁺)', amount: '0.19%', pct: 60 },
      { name: 'Iodeto de Potássio', amount: '45 ppm', pct: 95 },
    ],
    culinaryUse: 'Finalização de carnes nobres, peixe grelhado à beira-mar, saladas e foie gras.',
    recommendedPhoto: '/assets/aistudio/Salinas_BGB_315f5f95.jpeg',
    crystalShape: 'pyramid',
  },
  {
    id: 'sal-fino',
    name: 'Sal Fino Iodado Extra',
    tagline: 'Moagem de precisão cúbica micrométrica para dissolução instantânea e homogénea',
    granulometry: '0.2 – 0.8 mm',
    structure: 'Microcubos isométricos de cloreto de sódio puro',
    dissolutionTime: '1.8 segundos (Instantânea)',
    dissolutionSeconds: 1.8,
    naclPurity: '99.8%',
    iodineLevel: '45 mg/kg (Certificado)',
    minerals: [
      { name: 'Pureza NaCl', amount: '99.8%', pct: 99 },
      { name: 'Humidade Livre', amount: '< 0.15%', pct: 20 },
      { name: 'Insolúveis em Água', amount: '< 0.02%', pct: 10 },
      { name: 'Iodeto de Potássio', amount: '45 ppm', pct: 95 },
    ],
    culinaryUse: 'Calulu de peixe, refogados diários, massas, sopas e pastelaria de precisão.',
    recommendedPhoto: '/assets/aistudio/1792348717232_07a92de3.jpg',
    crystalShape: 'fine-cube',
  },
  {
    id: 'sal-grosso',
    name: 'Sal Grosso Marinho Natural',
    tagline: 'Grãos selecionados com textura robusta ideal para assados lentos e churrasco',
    granulometry: '3.0 – 6.0 mm',
    structure: 'Poliedros cristalinos densos de evaporação lenta',
    dissolutionTime: '6.2 segundos (Penetração gradual)',
    dissolutionSeconds: 6.2,
    naclPurity: '99.5%',
    iodineLevel: '45 mg/kg (MINSA)',
    minerals: [
      { name: 'Pureza NaCl', amount: '99.5%', pct: 96 },
      { name: 'Magnésio Natural', amount: '0.35%', pct: 75 },
      { name: 'Cálcio Marinho', amount: '0.24%', pct: 65 },
      { name: 'Iodeto de Potássio', amount: '45 ppm', pct: 95 },
    ],
    culinaryUse: 'Churrasco no carvão, crosta de sal para pargo e corvina, marinadas e salmouras.',
    recommendedPhoto: '/assets/aistudio/1792347915088_ef2f29a9.jpg',
    crystalShape: 'coarse-poly',
  },
  {
    id: 'sal-rosa',
    name: 'Sal Rosa Mineral do Himalaia',
    tagline: 'Cristais fósseis milenares ricos em 84 oligoelementos naturais com moedor cerâmico',
    granulometry: '2.5 – 5.0 mm',
    structure: 'Cristais poliédricos com inclusões de óxidos de ferro',
    dissolutionTime: '4.5 segundos no moinho',
    dissolutionSeconds: 4.5,
    naclPurity: '98.6%',
    iodineLevel: 'Naturalmente rico em minerais',
    minerals: [
      { name: 'Óxidos de Ferro', amount: 'Tom Rosado', pct: 80 },
      { name: 'Magnésio Mineral', amount: '0.16%', pct: 55 },
      { name: 'Cálcio Fóssil', amount: '0.40%', pct: 85 },
      { name: 'Potássio', amount: '0.35%', pct: 75 },
    ],
    culinaryUse: 'Moagem na mesa em carpaccios, legumes assados, salmão e cocktails gourmet.',
    recommendedPhoto: '/assets/aistudio/IMG_20261018_200550_819_44a9e455.jpg',
    crystalShape: 'pink-facet',
  },
];

export const GranulometryLab: React.FC = () => {
  const [selectedCrystal, setSelectedCrystal] = useState<CrystalSpec>(CRYSTAL_SPECS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(3); // 1x to 8x
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [dissolutionProgress, setDissolutionProgress] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Dissolution simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDissolving) {
      const stepTime = (selectedCrystal.dissolutionSeconds * 1000) / 100;
      interval = setInterval(() => {
        setDissolutionProgress((prev) => {
          if (prev >= 100) {
            setIsDissolving(false);
            return 100;
          }
          return prev + 1;
        });
      }, stepTime);
    }
    return () => clearInterval(interval);
  }, [isDissolving, selectedCrystal]);

  const handleStartDissolution = () => {
    setDissolutionProgress(0);
    setIsDissolving(true);
  };

  const handleResetDissolution = () => {
    setIsDissolving(false);
    setDissolutionProgress(0);
  };

  // Change crystal type
  const handleSelectCrystal = (spec: CrystalSpec) => {
    setSelectedCrystal(spec);
    setIsDissolving(false);
    setDissolutionProgress(0);
  };

  return (
    <section id="laboratorio" className="py-24 bg-[#FAF6F0] relative border-t border-[#D8C7B4] overflow-hidden">
      {/* Background soft decorative glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0B192C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <Microscope className="w-4 h-4 text-[#C5A059]" />
            <span>Laboratório de Controlo & Análise Dinâmica</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-4">
            A Anatomia do Cristal: Granulometria & Pureza AKOYA
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            Examine a geometria cúbica perfeita e o comportamento de dissolução dos nossos sais. Cada grão é calibrado para conferir crocância, sabor equilibrado e absorção homogénea.
          </p>
        </div>

        {/* Variety Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CRYSTAL_SPECS.map((spec) => {
            const isActive = selectedCrystal.id === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => handleSelectCrystal(spec)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#0B192C] text-[#C5A059] border-[#0B192C] shadow-md scale-105'
                    : 'bg-[#EDE4D8] text-[#4E4135] border-[#D8C7B4] hover:bg-[#E3D6C5]'
                }`}
              >
                {spec.name}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Microscope & Laboratory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Microscope Viewer Canvas/SVG */}
          <div className="lg:col-span-7 bg-[#EDE4D8] rounded-2xl border border-[#D8C7B4] p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8C7B4] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">
                  Microscópio Digital · Óptica {zoomLevel}x
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#5D5043]">Granulometria:</span>
                <span className="text-xs font-extrabold text-[#0B192C] bg-[#FAF6F0] px-2.5 py-0.5 rounded-md border border-[#D8C7B4]">
                  {selectedCrystal.granulometry}
                </span>
              </div>
            </div>

            {/* Interactive Visual Canvas: Procedural Crystal Rendering with Zoom & Refraction */}
            <div
              className="relative w-full h-80 sm:h-96 rounded-xl bg-gradient-to-b from-[#0B192C] via-[#132845] to-[#0B192C] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-inner"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                setRotationAngle(x * 40);
              }}
            >
              {/* Microscope Grid Reticle Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at center, transparent 30%, rgba(197, 160, 89, 0.4) 31%, transparent 32%),
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 30px 30px, 30px 30px',
                }}
              />

              {/* Water Wave Overlay during Dissolution */}
              <div
                className="absolute inset-x-0 bottom-0 bg-blue-500/20 backdrop-blur-xs transition-all duration-300 pointer-events-none flex items-end justify-center pb-2"
                style={{ height: `${dissolutionProgress}%` }}
              >
                {dissolutionProgress > 0 && (
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase drop-shadow-sm">
                    {dissolutionProgress === 100 ? 'Cristal 100% Dissolvido' : `Água Salina em Dissolução (${dissolutionProgress}%)`}
                  </span>
                )}
              </div>

              {/* Geometric SVG Crystal with Interactive Facets & Refraction */}
              <div
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel * 0.45}) rotate(${rotationAngle}deg)`,
                  opacity: Math.max(0.08, 1 - dissolutionProgress / 115),
                }}
              >
                {selectedCrystal.crystalShape === 'pyramid' && (
                  <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-2xl">
                    <polygon points="100,20 180,160 20,160" fill="rgba(255,255,255,0.85)" stroke="#C5A059" strokeWidth="2" />
                    <polygon points="100,20 180,160 100,130" fill="rgba(230,240,255,0.7)" />
                    <polygon points="100,20 20,160 100,130" fill="rgba(255,255,255,0.95)" />
                    <polygon points="20,160 100,130 180,160" fill="rgba(197,160,89,0.3)" />
                    <line x1="100" y1="20" x2="100" y2="130" stroke="#FFF" strokeWidth="2.5" />
                    {/* Floating micro glimmers */}
                    <circle cx="100" cy="20" r="4" fill="#FFEAA7" className="animate-ping" />
                    <circle cx="140" cy="90" r="2.5" fill="#FFF" />
                    <circle cx="60" cy="110" r="3" fill="#FFF" />
                  </svg>
                )}

                {selectedCrystal.crystalShape === 'fine-cube' && (
                  <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
                    {/* Isometric Cube */}
                    <polygon points="100,30 170,70 100,110 30,70" fill="rgba(255,255,255,0.95)" stroke="#C5A059" strokeWidth="1.5" />
                    <polygon points="30,70 100,110 100,180 30,140" fill="rgba(220,230,245,0.85)" stroke="#C5A059" strokeWidth="1.5" />
                    <polygon points="100,110 170,70 170,140 100,180" fill="rgba(195,210,230,0.75)" stroke="#C5A059" strokeWidth="1.5" />
                    <circle cx="100" cy="110" r="3" fill="#C5A059" />
                  </svg>
                )}

                {selectedCrystal.crystalShape === 'coarse-poly' && (
                  <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-2xl">
                    <polygon points="50,40 150,30 180,110 130,180 40,160 20,90" fill="rgba(255,255,255,0.88)" stroke="#C5A059" strokeWidth="2" />
                    <polygon points="50,40 110,80 150,30" fill="rgba(240,245,255,0.95)" />
                    <polygon points="150,30 110,80 180,110" fill="rgba(200,215,235,0.7)" />
                    <polygon points="110,80 130,180 180,110" fill="rgba(180,200,225,0.6)" />
                    <polygon points="50,40 20,90 40,160 110,80" fill="rgba(255,255,255,0.75)" />
                    <polygon points="110,80 40,160 130,180" fill="rgba(197,160,89,0.25)" />
                  </svg>
                )}

                {selectedCrystal.crystalShape === 'pink-facet' && (
                  <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-2xl">
                    <polygon points="60,30 140,20 185,85 150,175 55,180 15,100" fill="rgba(247, 185, 174, 0.9)" stroke="#E5989B" strokeWidth="2" />
                    <polygon points="60,30 105,75 140,20" fill="rgba(255, 214, 207, 0.95)" />
                    <polygon points="140,20 105,75 185,85" fill="rgba(229, 152, 155, 0.75)" />
                    <polygon points="105,75 150,175 185,85" fill="rgba(181, 101, 118, 0.6)" />
                    <polygon points="60,30 15,100 55,180 105,75" fill="rgba(255, 200, 195, 0.85)" />
                  </svg>
                )}
              </div>

              {/* Bottom Interactive Loupe Zoom Slider */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B192C]/85 backdrop-blur-md p-3 rounded-xl border border-[#C5A059]/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white shrink-0">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span>Zoom Óptico:</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full accent-[#C5A059] cursor-pointer"
                />
                <span className="text-xs font-extrabold text-[#C5A059] shrink-0 w-8 text-right">
                  {zoomLevel}x
                </span>
              </div>
            </div>

            {/* Bottom Actions: Dissolution Simulation */}
            <div className="mt-4 pt-4 border-t border-[#D8C7B4] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#5D5043]">
                <strong className="text-[#0B192C]">Tempo de Dissolução Nominal:</strong>{' '}
                <span>{selectedCrystal.dissolutionTime}</span>
              </div>

              <div className="flex items-center gap-2">
                {!isDissolving ? (
                  <button
                    onClick={handleStartDissolution}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    <Droplets className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{dissolutionProgress === 100 ? 'Repetir Dissolução' : 'Simular Dissolução'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetDissolution}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#5D5043] bg-[#FAF6F0] hover:bg-white rounded-lg border border-[#D8C7B4] transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Parar</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Dossier & Mineral Spectrometry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-sm space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88939]">
                  Ficha Analítica de Laboratório
                </span>
                <h3 className="text-xl font-bold text-[#1F1914]">{selectedCrystal.name}</h3>
                <p className="text-xs text-[#6C5F53] mt-1">{selectedCrystal.tagline}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4]">
                  <span className="text-[10px] text-[#6C5F53] block uppercase font-bold">Pureza NaCl</span>
                  <span className="text-lg font-extrabold text-[#0B192C]">{selectedCrystal.naclPurity}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4]">
                  <span className="text-[10px] text-[#6C5F53] block uppercase font-bold">Iodização (MINSA)</span>
                  <span className="text-sm font-extrabold text-emerald-800">{selectedCrystal.iodineLevel}</span>
                </div>
              </div>

              {/* Mineral Composition Bars */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">
                  Composição Mineral & Conformidade
                </h4>
                {selectedCrystal.minerals.map((min, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#4E4135]">
                      <span className="font-semibold">{min.name}</span>
                      <span className="font-bold text-[#0B192C]">{min.amount}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E3D6C5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C5A059] to-[#0B192C] rounded-full transition-all duration-500"
                        style={{ width: `${min.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Culinary application recommendation */}
              <div className="p-3.5 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] text-xs text-[#4E4135]">
                <strong className="text-[#0B192C] block mb-1">Harmonização Culinária Recomendada:</strong>
                <p className="leading-relaxed">{selectedCrystal.culinaryUse}</p>
              </div>
            </div>

            {/* Official Certification Stamp Box in Sand */}
            <div className="p-5 rounded-2xl bg-[#EDE4D8] border border-[#D8C7B4] shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B192C] flex items-center justify-center text-[#C5A059] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B88939]">
                  Decreto Presidencial nº 288/19
                </span>
                <h4 className="text-xs font-bold text-[#1F1914]">Controlo Sanitário & Iodização Universal</h4>
                <p className="text-[11px] text-[#6C5F53] leading-snug">
                  Amostragem em cada lote nas Salinas BGB de Benguela garantindo prevenção contra carências de iodo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
