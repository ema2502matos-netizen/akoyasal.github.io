import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SaltGrain {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
}

interface SaltSprinkleButtonProps {
  label?: string;
  className?: string;
  onSprinkled?: () => void;
}

export const SaltSprinkleButton: React.FC<SaltSprinkleButtonProps> = ({
  label = 'Salpicar com Akoya Sal',
  className = '',
  onSprinkled,
}) => {
  const [grains, setGrains] = useState<SaltGrain[]>([]);
  const [isSprinkling, setIsSprinkling] = useState(false);

  // Synthesize a crisp sea-salt grinder click/crunch using Web Audio API
  const playSprinkleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Create burst of filtered noise
      const bufferSize = ctx.sampleRate * 0.08; // 80ms burst
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 3500;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // AudioContext muted/unsupported, fail silently
    }
  };

  const handleSprinkle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    playSprinkleSound();
    setIsSprinkling(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const newGrains: SaltGrain[] = [];

    for (let i = 0; i < 24; i++) {
      newGrains.push({
        id: Date.now() + i,
        x: rect.width / 2,
        y: 0,
        vx: (Math.random() - 0.5) * 140,
        vy: -(Math.random() * 80 + 30),
        rotation: Math.random() * 360,
      });
    }

    setGrains(newGrains);

    if (onSprinkled) onSprinkled();

    setTimeout(() => {
      setGrains([]);
      setIsSprinkling(false);
    }, 1200);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleSprinkle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FAF6F0] hover:bg-white text-[#0B192C] border border-[#D8C7B4] shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95 group ${className}`}
        title="Clique para salpicar cristais de sal"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:rotate-45 transition-transform" />
        <span>{label}</span>
      </button>

      {/* Bursting Salt Grains */}
      {grains.map((grain) => (
        <span
          key={grain.id}
          style={{
            left: `${grain.x}px`,
            top: `${grain.y}px`,
            transform: `translate(${grain.vx}px, ${grain.vy + 70}px) rotate(${grain.rotation}deg)`,
            transition: 'all 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="pointer-events-none absolute w-1.5 h-1.5 bg-white border border-[#C5A059] rounded-xs shadow-xs z-30 opacity-90 animate-out fade-out duration-700"
        />
      ))}

      {isSprinkling && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#0B192C] text-[#C5A059] text-[10px] font-bold whitespace-nowrap shadow-md animate-in fade-in zoom-in duration-200">
          +Sabor & Pureza!
        </span>
      )}
    </div>
  );
};
