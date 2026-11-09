import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, MapPin, Award, Truck, Sparkles, Eye, Camera } from 'lucide-react';
import { COMPANY_INFO } from '../data/akoyaData';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenB2BQuote: () => void;
}

const HERO_VIEWS = [
  {
    id: 'salinas-bgb',
    label: 'Salinas BGB · Benguela',
    tag: 'Pirâmides de Sal Solar',
    image: '/assets/aistudio/Salinas_BGB_315f5f95.jpeg',
    description: 'Evaporação solar pura e pirâmides de sal colhidas sob o sol de Benguela.'
  },
  {
    id: 'parque-fabril',
    label: 'Parque Fabril & Silos',
    tag: 'Indústria 100% Angolana',
    image: '/assets/aistudio/file_00000000ec6081f4a9954dda89425804_8de21a4f.png',
    description: 'Capacidade de +5.000 ton/mês em silos verticais e linhas automatizadas.'
  },
  {
    id: 'reserva-sal',
    label: 'Grande Reserva Marinha',
    tag: 'Stock Estratégico',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.26_60bba5de.jpeg',
    description: 'Montanhas de sal marinho natural garantindo abastecimento regular a Angola.'
  },
  {
    id: 'cristal-mao',
    label: 'Pureza na Palma da Mão',
    tag: 'Cristais Naturais',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.28_9732d849.jpeg',
    description: 'Cristais cúbicos brancos colhidos diretamente dos sacos industriais de 25 kg.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onOpenB2BQuote }) => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveViewIndex((prev) => (prev + 1) % HERO_VIEWS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentView = HERO_VIEWS[activeViewIndex];

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#F6F1EA]">
      {/* Dynamic Background Image Layers with Smooth Transitions */}
      {HERO_VIEWS.map((view, idx) => (
        <div
          key={view.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            activeViewIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={view.image}
            alt={view.label}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Measured warm sand gradient overlay ensuring crisp contrast & readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6F1EA] via-[#F6F1EA]/92 to-[#F6F1EA]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1EA] via-transparent to-[#F6F1EA]/50" />
        </div>
      ))}

      {/* Floating View Switcher Pills (Top Right / Center) */}
      <div className="absolute top-28 right-4 sm:right-8 z-20 hidden md:flex items-center gap-2 p-1.5 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md border border-[#D8C7B4] shadow-sm">
        <div className="flex items-center gap-1.5 px-2.5 text-[11px] font-bold text-[#736556]">
          <Camera className="w-3.5 h-3.5 text-[#B88939]" />
          <span>Fotos Reais:</span>
        </div>
        {HERO_VIEWS.map((view, idx) => (
          <button
            key={view.id}
            onClick={() => {
              setActiveViewIndex(idx);
              setIsAutoPlaying(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeViewIndex === idx
                ? 'bg-[#0B192C] text-[#C5A059] shadow-xs ring-1 ring-[#0B192C]'
                : 'text-[#5D5043] hover:text-[#1F1914] hover:bg-[#EDE5DA]'
            }`}
          >
            {view.label.split('·')[0]}
          </button>
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* Natural editorial brand kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-4">
            <span className="w-6 h-[2px] bg-[#C5A059]" />
            <span>Essência Natural da Nossa Terra · Areias & Mar de Benguela</span>
          </div>

          {/* H1 Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B140E] tracking-tight leading-[1.1] mb-6 text-balance">
            O sal mais puro de Angola, colhido onde o sol abraça o Atlântico.
          </h1>

          {/* Value Proposition Subtitle */}
          <p className="text-base sm:text-lg text-[#4E4135] leading-relaxed mb-8 max-w-2xl font-normal">
            Produzido em Benguela a partir da evaporação solar da água do mar em dunas cristalinas. 100% natural, iodizado para a saúde da sua família e refinado segundo padrões internacionais para a mesa dos lares, hotelaria e grandes indústrias.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <button
              onClick={onExploreProducts}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Explorar Produtos & Lançamentos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
            </button>

            <button
              onClick={onOpenB2BQuote}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2D2319] bg-[#EDE4D8] hover:bg-[#E2D5C4] border border-[#CDBBA7] rounded-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#B88939]" />
              <span>Seja um Distribuidor B2B</span>
            </button>
          </div>

          {/* Interactive Photo Status Badge */}
          <div className="inline-flex items-center gap-3 p-2.5 pr-4 rounded-xl bg-[#FAF6F0]/90 backdrop-blur-md border border-[#D8C7B4] text-xs text-[#5D5043] shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-[#1F1914]">{currentView.tag}:</span>
            <span className="hidden sm:inline">{currentView.description}</span>
          </div>

          {/* Official Endorsement & Origin Quote */}
          <div className="pt-4 border-t border-[#D8C7B4] flex flex-wrap items-center gap-3 text-xs text-[#6C5F53]">
            <span className="text-[#0B192C] font-bold">Grupo Akoya:</span>
            <span>Do sal de Benguela para a mesa de Angola.</span>
            <span aria-hidden="true">·</span>
            <span>Atendimento comercial direto: <strong className="text-[#1B140E]">{COMPANY_INFO.phoneDisplay}</strong></span>
          </div>
        </div>
      </div>

      {/* Trust Strip & Quantitative Rigor in Sand Styling */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-[#D8C7B4] shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#EFE7DE] text-[#0B192C]">
              <MapPin className="w-5 h-5 text-[#B88939]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#736556] font-medium">01. Origem Local</p>
              <p className="text-sm font-bold text-[#1F1914] mt-0.5">Benguela, Angola</p>
              <p className="text-[11px] text-[#736556] mt-0.5">Evaporação solar limpa</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#EFE7DE] text-[#0B192C]">
              <ShieldCheck className="w-5 h-5 text-[#B88939]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#736556] font-medium">02. Saúde Pública</p>
              <p className="text-sm font-bold text-[#1F1914] mt-0.5">100% Iodizado</p>
              <p className="text-[11px] text-[#736556] mt-0.5">Normas oficiais MINSA</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#EFE7DE] text-[#0B192C]">
              <Award className="w-5 h-5 text-[#B88939]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#736556] font-medium">03. Portfólio</p>
              <p className="text-sm font-bold text-[#1F1914] mt-0.5">Gama Completa</p>
              <p className="text-[11px] text-[#736556] mt-0.5">De 200g a sacos de 25 kg</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#EFE7DE] text-[#0B192C]">
              <Truck className="w-5 h-5 text-[#B88939]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#736556] font-medium">04. Logística</p>
              <p className="text-sm font-bold text-[#1F1914] mt-0.5">Distribuição Nacional</p>
              <p className="text-[11px] text-[#736556] mt-0.5">18 Províncias de Angola</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
