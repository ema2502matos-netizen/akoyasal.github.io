import React, { useState, useRef } from 'react';
import { ChefHat, Sparkles, RotateCcw, Utensils, Award, CheckCircle2, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/akoyaData';

interface AngolanDish {
  id: string;
  name: string;
  region: string;
  image: string;
  idealSprinkles: number;
  recommendedSalt: string;
  description: string;
  tips: {
    under: string;
    perfect: string;
    over: string;
  };
}

const DISHES: AngolanDish[] = [
  {
    id: 'mufete',
    name: 'Mufete Tradicional de Chicharro',
    region: 'Ilha de Luanda & Litoral de Benguela',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    idealSprinkles: 5,
    recommendedSalt: 'Sal Fino Iodado & Flor de Sal Akoya',
    description: 'Chicharro fresco grelhado na brasa, servido com feijão de óleo de palma, batata-doce, banana-pão e molho vinagrete de cebola picada.',
    tips: {
      under: 'Ainda suave. O peixe precisa de mais uma pitada de Sal Fino Akoya para abrir o sabor da brasa.',
      perfect: '★ Ponto de Ouro Akoya! A acidez do vinagrete encontra o equilíbrio salino puro sem ofuscar o peixe fresco.',
      over: 'Sabor robusto e generoso! Acompanhe com mais feijão de óleo de palma e mandioca para harmonizar.',
    },
  },
  {
    id: 'calulu',
    name: 'Calulu de Peixe Seco e Fresco',
    region: 'Tradição Continental & Litoral',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    idealSprinkles: 4,
    recommendedSalt: 'Sal Fino Iodado de Cozinha Akoya',
    description: 'Camadas generosas de peixe fresco e peixe seco desfiado, quiabos, tomate, óleo de palma e ramas de batata-doce com pirão bem quente.',
    tips: {
      under: 'O caldo pede mais presença. Uma pitada extra equilibra a cremosidade dos quiabos.',
      perfect: '★ Ponto Perfeito! A iodização equilibrada do Sal Akoya realça o perfume do peixe sem mascarar as ramas.',
      over: 'Tempero intenso. Sirva com uma dose reforçada de funge ou pirão de milho.',
    },
  },
  {
    id: 'choco',
    name: 'Choco Grelhado na Brasa de Benguela',
    region: 'Baía Farta & Porto Amboim',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    idealSprinkles: 5,
    recommendedSalt: 'Flor de Sal em Pirâmide Akoya',
    description: 'Choco tenro selado no carvão vegetal, regado com azeite virgem, alho laminado e sumo de limão de Benguela.',
    tips: {
      under: 'Falta o toque crocante final. Aplique a Flor de Sal no momento de servir.',
      perfect: '★ Sublime! As pirâmides de Flor de Sal estalam no palato preservando a suculência do choco.',
      over: 'Toque bem marcado. O limão fresco e o alho compensam a intensidade salina.',
    },
  },
  {
    id: 'churrasco',
    name: 'Churrasco Nobre de Picanha na Brasa',
    region: 'Planalto Central & Fazendas de Angola',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    idealSprinkles: 6,
    recommendedSalt: 'Sal Grosso Marinho Natural Akoya',
    description: 'Cortes nobres com capa de gordura dourada, selados em fogo vivo com grãos espessos de sal marinho natural de Benguela.',
    tips: {
      under: 'A carne espessa requer grãos maiores de Sal Grosso Akoya para criar a crosta dourada.',
      perfect: '★ Perfeição Carnívora! Grãos uniformes que dissolvem com o calor e formam a crosta estaladiça ideal.',
      over: 'Crosta bem salgada. Bata suavemente com as costas da faca antes de fatiar.',
    },
  },
];

interface FallingParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

export const DishSeasoningSimulator: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<AngolanDish>(DISHES[0]);
  const [sprinkleCount, setSprinkleCount] = useState<number>(0);
  const [fallingParticles, setFallingParticles] = useState<FallingParticle[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play realistic salt grinder audio using Web Audio API
  const playSprinkleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate a cluster of salt crackles
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3200 + Math.random() * 2400, now + i * 0.04);
        gain.gain.setValueAtTime(0.04, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.06);
      }
    } catch {
      // Audio not permitted or supported
    }
  };

  const handleSprinkle = () => {
    playSprinkleSound();
    setSprinkleCount((prev) => prev + 1);

    // Spawn 8 animated crystal particles over the plate
    const newParticles: FallingParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: 35 + Math.random() * 30, // 35% to 65% width of plate
      y: 30 + Math.random() * 35, // 30% to 65% height of plate
      rotation: Math.random() * 360,
      size: 4 + Math.random() * 6,
    }));

    setFallingParticles((prev) => [...prev.slice(-32), ...newParticles]);
  };

  const handleReset = () => {
    setSprinkleCount(0);
    setFallingParticles([]);
  };

  const handleSelectDish = (dish: AngolanDish) => {
    setSelectedDish(dish);
    setSprinkleCount(0);
    setFallingParticles([]);
  };

  // Determine current seasoning level
  const ideal = selectedDish.idealSprinkles;
  let statusText = 'Insosso / Sem Sal';
  let statusColor = 'text-[#736556]';
  let adviceTip = selectedDish.tips.under;

  if (sprinkleCount === 0) {
    statusText = 'Aguardando Tempero (0 pitadas)';
    statusColor = 'text-[#736556]';
    adviceTip = 'Clique no botão abaixo para moer e salpicar o sal AKOYA sobre o prato.';
  } else if (sprinkleCount < ideal - 1) {
    statusText = 'Suave & Ligeiro';
    statusColor = 'text-amber-700';
    adviceTip = selectedDish.tips.under;
  } else if (sprinkleCount >= ideal - 1 && sprinkleCount <= ideal + 1) {
    statusText = '★ Ponto de Ouro AKOYA (Perfeito!)';
    statusColor = 'text-emerald-800 font-extrabold';
    adviceTip = selectedDish.tips.perfect;
  } else {
    statusText = 'Sabor Marcado & Enérgico';
    statusColor = 'text-orange-900 font-bold';
    adviceTip = selectedDish.tips.over;
  }

  return (
    <section id="simulador-tempero" className="py-24 bg-[#EFE8DE] relative border-t border-[#D8C7B4] overflow-hidden">
      {/* Decorative ambient sand glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Experiência Sensorial Interativa</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-4">
            Simulador de Tempero AKOYA: O Ponto Perfeito da Mesa
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            Escolha um prato ícone da nossa gastronomia e experimente a precisão do doseamento do sal marinho de Benguela.
          </p>
        </div>

        {/* Dish Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {DISHES.map((dish) => {
            const isActive = selectedDish.id === dish.id;
            return (
              <button
                key={dish.id}
                onClick={() => handleSelectDish(dish)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#0B192C] text-[#C5A059] border-[#0B192C] shadow-md scale-105'
                    : 'bg-[#FAF6F0] text-[#4E4135] border-[#D8C7B4] hover:bg-[#FAF6F0]'
                }`}
              >
                {dish.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Dish & Seasoning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Plate Canvas Area with Particle Gravity */}
          <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl border border-[#D8C7B4] p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D8C7B4]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88939]">
                  {selectedDish.region}
                </span>
                <h3 className="text-lg font-bold text-[#1F1914]">{selectedDish.name}</h3>
              </div>
              <span className="text-xs font-semibold text-[#0B192C] bg-[#EDE4D8] px-3 py-1 rounded-lg border border-[#D8C7B4]">
                Sal Ideal: {selectedDish.recommendedSalt}
              </span>
            </div>

            {/* Interactive Dish Plate with Real Food Photo & Crystals Overlay */}
            <div className="relative w-full h-72 sm:h-88 rounded-xl overflow-hidden border border-[#D8C7B4] shadow-inner bg-[#EDE4D8] group">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Salt Crystals Layer on the Plate */}
              {fallingParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-xs bg-white border border-[#C5A059]/40 shadow-xs pointer-events-none animate-ping-once"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    transform: `rotate(${p.rotation}deg)`,
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)',
                  }}
                />
              ))}

              {/* Sprinkles Counter Badge inside the plate */}
              <div className="absolute bottom-4 left-4 bg-[#0B192C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#C5A059]/40 flex items-center gap-2 text-white text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>
                  Pitadas Aplicadas: <strong>{sprinkleCount}</strong> / {ideal}
                </span>
              </div>
            </div>

            {/* Interactive Control Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleSprinkle}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-[#0B192C] hover:bg-[#132845] active:scale-95 text-[#C5A059] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer ring-2 ring-[#C5A059]/30"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Polvilhar Sal AKOYA (+1)</span>
              </button>

              <button
                onClick={handleReset}
                disabled={sprinkleCount === 0}
                className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                  sprinkleCount > 0
                    ? 'bg-[#EDE4D8] text-[#5D5043] border-[#D8C7B4] hover:bg-[#E3D6C5] cursor-pointer'
                    : 'bg-[#EDE4D8]/50 text-[#A89887] border-[#D8C7B4]/50 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Prato</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Flavor Gauge & Chef Commentary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Seasoning Gauge Box */}
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B88939]">
                  Diagnóstico de Palato
                </span>
                <span className={`text-xs ${statusColor}`}>
                  {statusText}
                </span>
              </div>

              {/* Progress Level Bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-[#EDE4D8] rounded-full overflow-hidden p-0.5 border border-[#D8C7B4]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      sprinkleCount === 0
                        ? 'w-1 bg-[#D8C7B4]'
                        : sprinkleCount < ideal - 1
                        ? 'bg-amber-600'
                        : sprinkleCount <= ideal + 1
                        ? 'bg-gradient-to-r from-emerald-600 to-[#C5A059]'
                        : 'bg-orange-800'
                    }`}
                    style={{ width: `${Math.min(100, (sprinkleCount / ideal) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-[#8C7D6F]">
                  <span>Insosso</span>
                  <span className="text-[#0B192C]">★ Ponto Akoya</span>
                  <span>Intenso</span>
                </div>
              </div>

              {/* Chef Commentary Bubble */}
              <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] flex items-center justify-center text-[#C5A059]">
                    <ChefHat className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#1F1914]">Parecer do Chef Angolano:</span>
                </div>
                <p className="text-xs text-[#4E4135] leading-relaxed italic">
                  "{adviceTip}"
                </p>
              </div>

              {/* Health Notice (Iodization benefit) */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#0B192C]">
                <CheckCircle2 className="w-4 h-4 text-[#B88939] shrink-0" />
                <span>
                  Iodizado segundo as normas do Ministério da Saúde de Angola (MINSA).
                </span>
              </div>
            </div>

            {/* Quick Order on WhatsApp CTA (Respects price rule: no prices here) */}
            <div className="p-5 rounded-2xl bg-[#0B192C] text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#FAF6F0]">Gostou da Combinação?</h4>
                <Award className="w-4 h-4 text-[#C5A059]" />
              </div>
              <p className="text-xs text-[#C5B5A5] leading-relaxed">
                Encomende diretamente a variante recomendada ({selectedDish.recommendedSalt}) para a sua cozinha ou restaurante.
              </p>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(`Olá Akoya Sal! Gostaria de encomendar ${selectedDish.recommendedSalt} para a confecção de ${selectedDish.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#071324] font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Encomendar para esta Receita</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
