import React, { useState } from 'react';
import { Sun, Wind, Droplets, Sparkles, CheckCircle2, ArrowRight, Gauge, Layers } from 'lucide-react';

interface StageInfo {
  salinityGrams: number;
  stageName: string;
  stageSubtitle: string;
  densityBe: string; // Baumé degrees
  crystalState: string;
  colorGrade: string;
  waterLevelPct: number;
  description: string;
  fact: string;
  actionText: string;
}

const STAGES: StageInfo[] = [
  {
    salinityGrams: 35,
    stageName: '01. Água Bruta do Oceano Atlântico',
    stageSubtitle: 'Captação Natural na Costa de Benguela',
    densityBe: '3.5 °Bé',
    crystalState: '100% Líquido / Iões Dissolvidos',
    colorGrade: '#3B82F6',
    waterLevelPct: 100,
    description: 'A água pura do mar é captada pelos canais costeiros para as primeiras bacias de decantação sem recurso a químicos.',
    fact: 'Benguela beneficia da corrente fria que traz água limpa e rica em minerais naturais.',
    actionText: 'Iniciar Evaporação Solar'
  },
  {
    salinityGrams: 85,
    stageName: '02. Bacias de Concentração Solar',
    stageSubtitle: 'Aquecimento por Insolação Contínua',
    densityBe: '8.2 °Bé',
    crystalState: 'Salmoura Primária Aquecida',
    colorGrade: '#0EA5E9',
    waterLevelPct: 75,
    description: 'O calor constante do sol de Benguela evapora a água doce livre, elevando a densidade dos sais naturais.',
    fact: 'Mais de 300 dias anuais de sol pleno em Benguela proporcionam energia 100% renovável.',
    actionText: 'Avançar Concentração'
  },
  {
    salinityGrams: 160,
    stageName: '03. Purificação & Decantação Natural',
    stageSubtitle: 'Precipitação Seletiva de Minerais Terrosos',
    densityBe: '16.0 °Bé',
    crystalState: 'Salmoura Saturada Transparente',
    colorGrade: '#14B8A6',
    waterLevelPct: 50,
    description: 'Nesta fase, o carbonato e sulfato de cálcio precipitam no fundo, garantindo que o sal final seja de brancura imaculada.',
    fact: 'Processo orgânico milenar que dispensa agentes químicos de clareamento.',
    actionText: 'Atingir Ponto de Saturação'
  },
  {
    salinityGrams: 260,
    stageName: '04. Ponto Crítico de Cristalização',
    stageSubtitle: 'Nascimento dos Cristais Cúbicos Akoya',
    densityBe: '25.5 °Bé',
    crystalState: 'Precipitação Maciça de Cristais de NaCl',
    colorGrade: '#C5A059',
    waterLevelPct: 25,
    description: 'A salmoura atinge a saturação exata de 260 g/L. Pequenas jóias geométricas de sal começam a flutuar e assentar.',
    fact: 'Os cristais formam-se em cubos perfeitos preservando minerais nobres.',
    actionText: 'Ver Formação das Pirâmides'
  },
  {
    salinityGrams: 320,
    stageName: '05. Colheita das Pirâmides nas Salinas BGB',
    stageSubtitle: 'Cristais 100% Puros Prontos para Refinaria',
    densityBe: '29.0 °Bé',
    crystalState: 'Pirâmides de Sal Cristalino (Pronto a Colher)',
    colorGrade: '#0B192C',
    waterLevelPct: 10,
    description: 'Centenas de pirâmides brancas reluzem sob o sol de Benguela, recolhidas com método tradicional e levadas à unidade mecanizada.',
    fact: 'Pureza de NaCl atinge mais de 99.4%, com teor controlado de humidade.',
    actionText: 'Reiniciar Ciclo Solar'
  }
];

export const SalinitySimulator: React.FC = () => {
  const [stageIndex, setStageIndex] = useState<number>(3); // start at crystallization point

  const stage = STAGES[stageIndex];

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-md my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5D8C8]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B88939] uppercase tracking-wider mb-1">
            <Gauge className="w-4 h-4 text-[#C5A059]" />
            <span>Simulador Interativo de Evaporação Solar</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F1914]">
            A Metamorfose da Salmoura em Benguela
          </h3>
          <p className="text-xs sm:text-sm text-[#5D5043] mt-0.5">
            Arraste o cursor abaixo para observar como a densidade mineral transforma a água do mar nos cristais Akoya.
          </p>
        </div>

        {/* Live Gauges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] text-center">
            <span className="text-[10px] uppercase font-bold text-[#736556] block">Salinidade</span>
            <span className="text-base font-extrabold text-[#0B192C]">{stage.salinityGrams} g/L</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] text-center">
            <span className="text-[10px] uppercase font-bold text-[#736556] block">Escala Baumé</span>
            <span className="text-base font-extrabold text-[#B88939]">{stage.densityBe}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Display */}
      <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Visualizer (Salt basin cutaway) */}
        <div className="lg:col-span-5 relative rounded-2xl p-5 bg-[#EDE5DA] border border-[#D8C7B4] overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-[#1F1914] mb-3">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#B88939]" />
              <span>Corte Seccional da Bacia Cristalizadora</span>
            </span>
            <span className="text-[#736556]">Nível: {stage.waterLevelPct}%</span>
          </div>

          {/* Animated Water Reservoir */}
          <div className="relative h-48 w-full rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] overflow-hidden flex flex-col justify-end p-2">
            {/* Sun rays above */}
            <div className="absolute top-2 right-3 flex items-center gap-1.5 text-xs font-bold text-[#B88939] animate-pulse">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Sol Costeiro Ativo</span>
            </div>

            {/* Dynamic Water Layer */}
            <div 
              style={{ 
                height: `${stage.waterLevelPct}%`,
                backgroundColor: stage.colorGrade 
              }} 
              className="w-full rounded-lg transition-all duration-700 opacity-80 relative flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span className="text-white text-xs font-bold tracking-wider z-10 px-2 py-0.5 rounded bg-black/30 backdrop-blur-xs">
                {stage.salinityGrams} g/L
              </span>
            </div>

            {/* Salt Crystals forming at bottom when salinity >= 260 */}
            {stage.salinityGrams >= 260 && (
              <div className="absolute bottom-2 left-2 right-2 h-10 flex items-end justify-center gap-1.5 z-20 animate-in fade-in duration-500">
                <div className="w-5 h-6 bg-white border border-[#C5A059] rounded-t-sm shadow-sm rotate-3 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </div>
                <div className="w-7 h-9 bg-white border border-[#C5A059] rounded-t-sm shadow-md -rotate-2 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <div className="w-6 h-7 bg-white border border-[#C5A059] rounded-t-sm shadow-sm rotate-4 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </div>
                <div className="w-5 h-5 bg-white border border-[#C5A059] rounded-t-sm shadow-sm -rotate-3" />
              </div>
            )}
          </div>

          {/* Micro status beneath visualizer */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#5D5043]">
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-[#B88939]" />
              <span>Vento Atlântico Acelerador</span>
            </span>
            <span className="font-bold text-[#0B192C]">
              {stage.crystalState}
            </span>
          </div>
        </div>

        {/* Right Stage Description & Facts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#0B192C] text-[#C5A059] text-xs font-bold">
              Etapa {stageIndex + 1} de {STAGES.length}
            </span>
            <span className="text-xs text-[#736556] font-medium">
              Controlo de Qualidade Akoya Sal
            </span>
          </div>

          <h4 className="font-display text-2xl font-extrabold text-[#1F1914]">
            {stage.stageName}
          </h4>
          <p className="text-sm font-semibold text-[#9A7236]">
            {stage.stageSubtitle}
          </p>

          <p className="text-sm text-[#4E4135] leading-relaxed">
            {stage.description}
          </p>

          <div className="p-3.5 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] flex items-start gap-2.5 text-xs text-[#3D3126]">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0B192C]">Rigor de Benguela:</strong> {stage.fact}
            </div>
          </div>
        </div>
      </div>

      {/* Slider Track & Stage Steps */}
      <div className="pt-6 border-t border-[#E5D8C8] space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#5D5043]">
          <span>35 g/L (Mar Aberto)</span>
          <span className="text-[#B88939]">260 g/L (Cristalização)</span>
          <span>320 g/L (Pirâmides BGB)</span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="0"
          max={STAGES.length - 1}
          step="1"
          value={stageIndex}
          onChange={(e) => setStageIndex(parseInt(e.target.value, 10))}
          className="w-full h-2.5 bg-[#EDE5DA] rounded-lg appearance-none cursor-pointer accent-[#0B192C] border border-[#D8C7B4]"
        />

        {/* Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {STAGES.map((s, idx) => {
            const isCurrent = stageIndex === idx;
            return (
              <button
                key={s.salinityGrams}
                onClick={() => setStageIndex(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-md ring-2 ring-[#C5A059]'
                    : 'bg-[#EDE4D8] text-[#5D5043] border-[#D8C7B4] hover:bg-[#FAF6F0]'
                }`}
              >
                <span className={`text-[10px] font-bold block ${isCurrent ? 'text-[#C5A059]' : 'text-[#736556]'}`}>
                  Fase {idx + 1}
                </span>
                <span className="text-xs font-extrabold block truncate">{s.salinityGrams} g/L</span>
                <span className="text-[10px] block truncate opacity-80">{s.stageName.split('.')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
