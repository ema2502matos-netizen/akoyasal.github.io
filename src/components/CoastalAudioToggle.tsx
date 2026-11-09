import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const CoastalAudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorIntervalRef = useRef<number | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 1. White noise generator for ocean surf & coastal wind
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // 2. Biquad filter for soothing wave sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // 3. Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNodeRef.current = masterGain;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      whiteNoise.start();

      // Subtle wave swelling rhythm
      let time = 0;
      const waveInterval = window.setInterval(() => {
        if (!audioCtxRef.current || !filter) return;
        time += 0.1;
        const targetFreq = 260 + Math.sin(time * 0.4) * 180;
        filter.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.4);
      }, 200);
      oscillatorIntervalRef.current = waveInterval;

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAmbientSound = () => {
    if (oscillatorIntervalRef.current) {
      clearInterval(oscillatorIntervalRef.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorIntervalRef.current) {
        clearInterval(oscillatorIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
        isPlaying
          ? 'bg-[#0B192C] text-[#C5A059] border-[#0B192C] shadow-sm'
          : 'bg-[#FAF6F0] text-[#5D5043] border-[#D8C7B4] hover:bg-[#EDE5DA]'
      }`}
      title={isPlaying ? 'Pausar som ambiente de Benguela' : 'Ativar som ambiente das salinas (ondas e brisa)'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden sm:inline">Brisa das Salinas</span>
          <span className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-[#C5A059] animate-pulse" />
            <span className="w-0.5 h-2 bg-[#C5A059] animate-pulse delay-75" />
            <span className="w-0.5 h-3.5 bg-[#C5A059] animate-pulse delay-150" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#736556]" />
          <span className="hidden sm:inline">Som Ambiente</span>
        </>
      )}
    </button>
  );
};
