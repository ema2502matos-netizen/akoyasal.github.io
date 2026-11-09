import React, { useEffect, useState } from 'react';

interface SectionMilestone {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: SectionMilestone[] = [
  { id: 'inicio', label: 'Início', shortLabel: '01' },
  { id: 'historia', label: 'Origem & Marca', shortLabel: '02' },
  { id: 'infraestrutura', label: 'Salinas BGB', shortLabel: '03' },
  { id: 'laboratorio', label: 'Laboratório', shortLabel: '04' },
  { id: 'produtos', label: 'Catálogo', shortLabel: '05' },
  { id: 'simulador-tempero', label: 'Culinária', shortLabel: '06' },
  { id: 'b2b', label: 'B2B & Cotação', shortLabel: '07' },
  { id: 'contactos', label: 'Contactos', shortLabel: '08' },
];

export const ScrollProgressRadar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Top micro progress bar */}
      <div className="h-1 w-full bg-[#EDE5DA]/60 backdrop-blur-xs relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#0B192C] transition-all duration-150 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating dynamic radar dock on desktop right */}
      <nav aria-label="Navegação rápida por marcos da página" className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col items-end gap-2.5 pointer-events-auto z-40 bg-[#FAF6F0]/90 backdrop-blur-md p-2.5 rounded-full border border-[#D8C7B4] shadow-lg">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex items-center justify-center cursor-pointer"
              aria-label={`Saltar para secção ${sec.label}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#1F1914] bg-[#FAF6F0] border border-[#D8C7B4] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {sec.label}
              </span>

              {/* Bullet node */}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#0B192C] ring-4 ring-[#C5A059]/40 scale-125'
                    : 'bg-[#D8C7B4] group-hover:bg-[#C5A059] group-hover:scale-110'
                }`}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
