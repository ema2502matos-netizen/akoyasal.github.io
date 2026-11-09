import React, { useState } from 'react';
import { 
  Building2, 
  Sun, 
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  Info, 
  ZoomIn, 
  ChevronRight, 
  ChevronLeft, 
  Flame,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { FACILITY_GALLERY } from '../data/akoyaData';
import { FacilityPhoto } from '../types/akoya';

interface FacilityTourProps {
  onOpenB2BQuote?: () => void;
}

export const FacilityTour: React.FC<FacilityTourProps> = ({ onOpenB2BQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'salinas' | 'fabrica' | 'pureza'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredPhotos = selectedCategory === 'all' 
    ? FACILITY_GALLERY 
    : FACILITY_GALLERY.filter(p => p.category === selectedCategory);

  const currentPhoto: FacilityPhoto = filteredPhotos[activePhotoIndex] || FACILITY_GALLERY[0];

  const handleNext = () => {
    setActiveHotspot(null);
    setIsZoomed(false);
    setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setIsZoomed(false);
    setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="infraestrutura" className="py-24 bg-[#EDE5DA] relative overflow-hidden border-t border-[#D8C7B4]">
      {/* Decorative ambient sand glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#0B192C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <Building2 className="w-4 h-4 text-[#C5A059]" />
            <span>Transparência & Rigor Industrial</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-4 text-balance">
            Tour Dinâmico às Salinas de Benguela & Parque Fabril
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            Conheça as instalações reais onde nasce o AKOYA SAL. Da geometria pura das pirâmides de sal nas Salinas BGB até à linha industrial mecanizada de iodização e ensaque de 25 kg.
          </p>
        </div>

        {/* Live Facility Status Banner (Sand Theme Ticker) */}
        <div className="mb-10 p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
            </span>
            <span className="text-xs font-bold text-[#1F1914]">
              Operação em Tempo Real: <span className="text-emerald-700 font-semibold">Salinas & Refinaria Ativas em Benguela</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#6C5F53]">
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-[#B88939]" />
              <span>Benguela: 29°C · Vento Costeiro 14 nós</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B192C]" />
              <span>Controlo Laboratorial: Lote Aprovado MINSA</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'Todas as Fotos Reais' },
            { id: 'salinas', label: 'Salinas BGB & Colheita Solar' },
            { id: 'fabrica', label: 'Parque Fabril & Ensaque 25 kg' },
            { id: 'pureza', label: 'Inspeção do Cristal na Mão' }
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id as any);
                  setActivePhotoIndex(0);
                  setActiveHotspot(null);
                  setIsZoomed(false);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B192C] text-white shadow-sm ring-1 ring-[#0B192C]'
                    : 'bg-[#FAF6F0] text-[#5D5043] border border-[#D8C7B4] hover:bg-[#F2ECE3]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Main Visual Frame with Hotspots & Magnifier */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#D8C7B4] shadow-lg bg-[#231B15] group">
              {/* Image Container with optional Zoom */}
              <div 
                className={`relative w-full h-[460px] sm:h-[520px] overflow-hidden cursor-crosshair transition-all duration-300 ${
                  isZoomed ? 'scale-125' : 'scale-100'
                }`}
              >
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1914]/85 via-transparent to-transparent pointer-events-none" />

                {/* Interactive Hotspot Dots */}
                {currentPhoto.hotspots && currentPhoto.hotspots.map((hs, idx) => {
                  const isHsActive = activeHotspot === idx;
                  return (
                    <div
                      key={idx}
                      style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(isHsActive ? null : idx);
                        }}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isHsActive 
                            ? 'bg-[#C5A059] text-[#0B192C] scale-125 shadow-lg shadow-[#C5A059]/40 ring-4 ring-white' 
                            : 'bg-[#0B192C]/90 text-white hover:scale-110 ring-2 ring-white/80'
                        }`}
                        title={hs.title}
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-40" />
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      {/* Hotspot Floating Tooltip */}
                      {isHsActive && (
                        <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 p-3.5 rounded-xl bg-[#FAF6F0] text-[#1F1914] border border-[#D8C7B4] shadow-xl text-left z-30 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7236]">Ponto de Interesse</span>
                            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                          </div>
                          <h5 className="text-xs font-bold text-[#1F1914] mb-1">{hs.title}</h5>
                          <p className="text-[11px] text-[#5D5043] leading-relaxed">{hs.detail}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Controls Overlay Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#0B192C]/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 pointer-events-auto">
                  {currentPhoto.badge}
                </span>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-lg bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-[#1F1914] text-xs font-semibold backdrop-blur-md border border-[#D8C7B4] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    title={isZoomed ? 'Reduzir zoom' : 'Ampliar detalhes'}
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#B88939]" />
                    <span className="hidden sm:inline">{isZoomed ? 'Zoom 1x' : 'Lupa 2x'}</span>
                  </button>

                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-2 rounded-lg bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-[#1F1914] text-xs font-semibold backdrop-blur-md border border-[#D8C7B4] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    title="Ver em ecrã inteiro"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#0B192C]" />
                    <span className="hidden sm:inline">Ecrã Inteiro</span>
                  </button>
                </div>
              </div>

              {/* Navigation Arrows on Overlay */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF6F0]/90 hover:bg-white text-[#1F1914] flex items-center justify-center border border-[#D8C7B4] shadow-md transition-all cursor-pointer z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF6F0]/90 hover:bg-white text-[#1F1914] flex items-center justify-center border border-[#D8C7B4] shadow-md transition-all cursor-pointer z-10"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-[#D8C7B4] text-[#1F1914] shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88939]">
                      {currentPhoto.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F1914]">
                      {currentPhoto.title}
                    </h3>
                  </div>
                  <div className="text-xs text-[#736556] flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#0B192C]" />
                    <span>Clique nos pontos dourados para detalhes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {filteredPhotos.map((photo, idx) => {
                const isSelected = activePhotoIndex === idx;
                return (
                  <button
                    key={photo.id}
                    onClick={() => {
                      setActivePhotoIndex(idx);
                      setActiveHotspot(null);
                      setIsZoomed(false);
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer h-16 sm:h-20 ${
                      isSelected 
                        ? 'border-[#0B192C] ring-2 ring-[#C5A059]' 
                        : 'border-[#D8C7B4] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-[#0B192C]/10" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Information & Technical Rigor Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* Description Card */}
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B88939] uppercase tracking-wider">
                  Especificação Técnica
                </span>
                <span className="text-xs text-[#736556] bg-[#EDE4D8] px-2.5 py-0.5 rounded-full font-medium">
                  Foto {activePhotoIndex + 1} de {filteredPhotos.length}
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-[#1F1914]">
                {currentPhoto.subtitle}
              </h4>

              <p className="text-xs sm:text-sm text-[#4E4135] leading-relaxed">
                {currentPhoto.description}
              </p>

              {/* Technical Metrics Badges */}
              <div className="space-y-2 pt-2 border-t border-[#E5D8C8]">
                {currentPhoto.technicalMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#EDE4D8]/80 text-xs">
                    <span className="text-[#6C5F53] font-medium">{metric.label}</span>
                    <span className="text-[#0B192C] font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* B2B Callout */}
              <div className="pt-4 border-t border-[#E5D8C8]">
                <button
                  onClick={onOpenB2BQuote}
                  className="w-full py-3 px-4 rounded-lg bg-[#0B192C] hover:bg-[#132845] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Agendar Visita Comercial à Fábrica</span>
                </button>
              </div>
            </div>

            {/* Mineral Purity & Public Health Factbox */}
            <div className="p-5 rounded-2xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1F1914]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Porquê o Sal de Benguela é Superior?</span>
              </div>
              <p className="text-xs text-[#5D5043] leading-relaxed">
                A corrente fria de Benguela transporta águas profundas de alta salinidade e pureza mineral. A evaporação natural preserva os oligoelementos que o sal refinado artificial perde.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#3D3126]">
                <div className="p-2 rounded bg-[#FAF6F0] border border-[#D8C7B4]">
                  <strong className="block text-[#0B192C]">0% Químicos</strong>
                  <span>Sem alvejantes</span>
                </div>
                <div className="p-2 rounded bg-[#FAF6F0] border border-[#D8C7B4]">
                  <strong className="block text-[#0B192C]">100% MINSA</strong>
                  <span>Iodização médica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#C5A059] text-sm font-bold p-2 cursor-pointer"
            >
              Fechar ✕
            </button>
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold">{currentPhoto.title}</h3>
              <p className="text-xs text-stone-300 max-w-xl mx-auto mt-1">{currentPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
