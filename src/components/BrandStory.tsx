import React, { useState } from 'react';
import { Sparkles, Droplets, Sun, CheckCircle2, Shield, Award, HeartHandshake, MapPin, Eye } from 'lucide-react';
import { PROCESS_STEPS, BRAND_STORY } from '../data/akoyaData';
import { SalinitySimulator } from './SalinitySimulator';
import { TiltCard } from './TiltCard';

export const BrandStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = PROCESS_STEPS[activeStep];

  return (
    <section id="historia" className="py-24 bg-[#EFE8DE] relative overflow-hidden border-t border-[#D8C7B4]">
      {/* Decorative ambient subtle sand dune gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#0B192C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Construção de Marca & Origem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-5 text-balance">
            Porquê AKOYA? A Raridade da Pérola nas Areias e Salinas da Nossa Terra.
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            Na tradição dos mares, a pérola Akoya é celebrada como a mais pura, perfeita e luminosa criação do oceano. É essa mesma perfeição que baptiza o nosso sal marinho, nascido das águas límpidas e das areias nobres de Benguela.
          </p>
        </div>

        {/* 2-Column Split: The Pearl Narrative & Real Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#C5A059]">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1F1914]">Aliança entre o Atlântico, as Areias e o Sol</h3>
                  <p className="text-xs text-[#736556]">Benguela · Berço Histórico da Salicultura Angolana</p>
                </div>
              </div>

              <p className="text-sm text-[#4E4135] leading-relaxed">
                {BRAND_STORY.pearlMetaphor}
              </p>

              <div className="pt-4 border-t border-[#E5D8C8] grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-[#0B192C] font-bold">100% Sal Marinho</span>
                  <p className="text-xs text-[#6C5F53]">Evaporação solar pura sem processos químicos de branqueamento.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-[#0B192C] font-bold">Iodizado pelo MINSA</span>
                  <p className="text-xs text-[#6C5F53]">Doseamento certificado para a proteção da saúde das famílias.</p>
                </div>
              </div>
            </div>

            {/* Mission, Vision & Values Mini Grid in Sand Tone */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] text-center shadow-xs">
                <Shield className="w-4 h-4 text-[#B88939] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-[#1F1914] mb-1">Missão</h4>
                <p className="text-[11px] text-[#6C5F53] leading-tight">Levar sal puro e digno a todos os lares angolanos.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] text-center shadow-xs">
                <Award className="w-4 h-4 text-[#B88939] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-[#1F1914] mb-1">Visão</h4>
                <p className="text-[11px] text-[#6C5F53] leading-tight">Ser a referência nacional e regional de sal no mercado africano.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] text-center shadow-xs">
                <HeartHandshake className="w-4 h-4 text-[#B88939] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-[#1F1914] mb-1">Valores</h4>
                <p className="text-[11px] text-[#6C5F53] leading-tight">Pureza, Qualidade, Compromisso e Orgulho Local.</p>
              </div>
            </div>
          </div>

          {/* Right Image Showcase with Real Photo: Pure Salt Crystals in Hand */}
          <div className="lg:col-span-6 relative">
            <TiltCard maxTilt={7} scale={1.02} glare={true}>
              <div className="relative rounded-2xl overflow-hidden border border-[#D8C7B4] shadow-md group bg-[#E3D6C5]">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.28_9732d849.jpeg"
                  alt="Cristais de sal marinho Akoya colhidos na mão direto do saco industrial"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1914]/85 via-[#1F1914]/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-[#D8C7B4] shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88939]">Foto Real do Produto</span>
                      <h4 className="text-base font-bold text-[#1F1914]">Pureza Cúbica na Palma da Mão</h4>
                      <p className="text-xs text-[#5D5043] mt-0.5">Cristais brancos íntegros sem agentes de branqueamento</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#0B192C] bg-[#EDE4D8] px-3 py-1.5 rounded-lg font-bold border border-[#D8C7B4]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B88939]" />
                      <span>Pureza &gt; 99.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Dynamic Salinity and Solar Concentration Interactive Simulator */}
        <SalinitySimulator />

        {/* Process Interactive Timeline "Do Mar ao Saleiro" with Real Step Photos */}
        <div id="processo" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A7236] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B88939]" />
              <span>O Nosso Processo de Fabrico</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914]">
              Do Mar ao Saleiro: A Jornada da Pureza
            </h3>
            <p className="text-sm text-[#5D5043] mt-2">
              Clique nas etapas abaixo para ver a foto real e o rigor técnico correspondente em Benguela.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(index)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#FAF6F0] border-[#0B192C] shadow-md shadow-[#0B192C]/5 ring-1 ring-[#0B192C]' 
                      : 'bg-[#FAF6F0]/60 border-[#D8C7B4] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-2xl font-display font-extrabold ${isActive ? 'text-[#0B192C]' : 'text-[#8C7D6F]'}`}>
                      {step.stepNumber}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0B192C] text-[#C5A059]">
                        Ativo
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#1F1914] mb-1">{step.title}</h4>
                  <p className="text-xs text-[#6C5F53] line-clamp-2">{step.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Active Step Highlight Card with Real Photo */}
          <div className="p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-widest text-[#B88939] uppercase">
                    Etapa {currentStep.stepNumber} de 04
                  </span>
                  <span className="text-[#CDBBA7]">|</span>
                  <span className="text-sm text-[#4E4135] font-semibold">
                    {currentStep.subtitle}
                  </span>
                </div>

                <h4 className="font-display text-2xl font-bold text-[#1F1914]">
                  {currentStep.title}
                </h4>

                <p className="text-sm sm:text-base text-[#4E4135] leading-relaxed">
                  {currentStep.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#0B192C] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#B88939] shrink-0" />
                  <span>Benefício Fundamental: {currentStep.keyBenefit}</span>
                </div>

                {currentStep.technicalSpec && (
                  <div className="p-3 rounded-lg bg-[#EDE4D8] border border-[#D8C7B4] text-xs text-[#4E4135]">
                    <strong className="text-[#0B192C]">Especificação Técnica:</strong> {currentStep.technicalSpec}
                  </div>
                )}
              </div>

              {/* Real Step Photo Showcase */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#D8C7B4] shadow-sm bg-[#EDE4D8]">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{currentStep.location || 'Benguela, Angola'}</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-0.5">{currentStep.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
