import React from 'react';

interface WaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  inverted?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = '#EFE8DE',
  bgColor = '#F6F1EA',
  inverted = false,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none relative select-none pointer-events-none ${
        inverted ? 'rotate-180' : ''
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="relative block w-full h-10 sm:h-14 lg:h-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.85" />
            <stop offset="50%" stopColor={fillColor} stopOpacity="1" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Back undulating wave layer */}
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,-20 1200,40 L1200,120 L0,120 Z"
          fill={fillColor}
          opacity="0.45"
        />

        {/* Front undulating wave layer */}
        <path
          d="M0,0 C200,60 400,-20 600,40 C800,100 1000,10 1200,20 L1200,120 L0,120 Z"
          fill="url(#waveGrad)"
        />
      </svg>
    </div>
  );
};
