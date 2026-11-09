import React, { useState } from 'react';
import { Menu, X, FileText, PhoneCall, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/akoyaData';
import { CoastalAudioToggle } from './CoastalAudioToggle';

interface NavbarProps {
  onOpenBrandGuide: () => void;
  onOpenB2BQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrandGuide, onOpenB2BQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F1EA]/92 backdrop-blur-md border-b border-[#D8C7B4]/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <a 
          href="#" 
          className="flex items-center gap-3.5 group text-decoration-none shrink-0"
          aria-label="AKOYA SAL - Início"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#0B192C] border border-[#C5A059]/50 shadow-sm group-hover:border-[#C5A059] transition-colors">
            <img 
              src="/brand/akoya-emblem.png" 
              alt="Akoya Sal Símbolo" 
              className="w-7 h-7 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-wider text-[#0B192C] flex items-center gap-1.5 leading-none">
              <span>AKOYA</span>
              <span className="text-[#B88939] font-light text-base tracking-widest">SAL</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#736353] font-medium mt-1">
              Benguela · Angola
            </span>
          </div>
        </a>

        {/* Zone 2: Concise Nav Links (Single line, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4D4034]">
          <a 
            href="#historia" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0"
          >
            História
          </a>
          <a 
            href="#infraestrutura" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Salinas BGB</span>
          </a>
          <a 
            href="#laboratorio" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0"
          >
            Laboratório
          </a>
          <a 
            href="#produtos" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0"
          >
            Produtos
          </a>
          <a 
            href="#simulador-tempero" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0"
          >
            Simulador de Tempero
          </a>
          <a 
            href="#b2b" 
            className="hover:text-[#B88939] transition-colors whitespace-nowrap shrink-0"
          >
            B2B & Cotação
          </a>
        </nav>

        {/* Zone 3: Actions (Coastal Sound, Brand Guide & Primary Quote Action) */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <CoastalAudioToggle />

          <button
            onClick={onOpenBrandGuide}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#3D3126] bg-[#EDE4D8] hover:bg-[#E3D7C7] border border-[#D1BFAB] rounded-md transition-all whitespace-nowrap cursor-pointer"
            title="Ver Estratégia de Marca, Copywriting e Diretrizes No-Code"
          >
            <FileText className="w-3.5 h-3.5 text-[#B88939]" />
            <span>Dossiê de Copy</span>
          </button>

          <button
            onClick={onOpenB2BQuote}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#122744] border border-[#C5A059]/40 rounded-md shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Pedir Cotação B2B</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3D3126] hover:text-[#0B192C] rounded-md border border-[#D8C7B4]"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F6F1EA] border-b border-[#D8C7B4] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#4D4034]">
            <a 
              href="#historia" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#B88939] transition-colors"
            >
              História & Pureza da Pérola
            </a>
            <a 
              href="#produtos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#B88939] transition-colors"
            >
              Catálogo & Novos Lançamentos
            </a>
            <a 
              href="#processo" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#B88939] transition-colors"
            >
              Processo de Fabrico
            </a>
            <a 
              href="#b2b" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#B88939] transition-colors"
            >
              B2B & Fornecimento em Grande Escala
            </a>
            <a 
              href="#receitas" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#B88939] transition-colors"
            >
              Receitas Angolanas (Mufete, Calulu)
            </a>
          </nav>

          <div className="pt-4 border-t border-[#D8C7B4] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrandGuide();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#231B15] bg-[#EDE4D8] border border-[#D1BFAB] rounded-md"
            >
              <FileText className="w-4 h-4 text-[#B88939]" />
              <span>Dossiê de Branding & Copy</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenB2BQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0B192C] rounded-md"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Pedir Cotação B2B</span>
            </button>
            
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-[#695D52] hover:text-[#0B192C] pt-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#B88939]" />
              <span>WhatsApp Directo: {COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
