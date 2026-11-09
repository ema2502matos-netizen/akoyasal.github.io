import React from 'react';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/akoyaData';

interface FooterProps {
  onOpenBrandGuide: () => void;
  onOpenB2BQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandGuide, onOpenB2BQuote }) => {
  return (
    <footer className="bg-[#EDE5DA] text-[#4E4135] border-t border-[#D8C7B4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center shadow-xs">
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
                <span className="font-display text-xl font-bold tracking-wider text-[#0B192C]">
                  AKOYA <span className="text-[#B88939] font-light">SAL</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#736556]">
                  Grupo Akoya · Benguela, Angola
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5D5043] leading-relaxed">
              {COMPANY_INFO.slogan} Produzido e refinado em Benguela com recurso à evaporação solar limpa nas dunas costeiras. 100% natural, iodizado para a saúde familiar e certificado para a indústria nacional.
            </p>

            {/* Seal of Made in Angola in Sand Styling */}
            <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] flex items-center gap-3 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#0B192C] shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#1F1914] block">Selo Feito em Angola</span>
                <span className="text-[10px] text-[#6C5F53]">Produção Local com Padrão Internacional de Refinação</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-xs text-[#5D5043]">
              <li><a href="#historia" className="hover:text-[#0B192C] transition-colors">História & Pureza</a></li>
              <li><a href="#produtos" className="hover:text-[#0B192C] transition-colors">Catálogo & Lançamentos</a></li>
              <li><a href="#processo" className="hover:text-[#0B192C] transition-colors">Processo de Fabrico</a></li>
              <li><a href="#b2b" className="hover:text-[#0B192C] transition-colors">B2B & Fornecimento</a></li>
              <li><a href="#receitas" className="hover:text-[#0B192C] transition-colors">Receitas Angolanas</a></li>
              <li>
                <button 
                  onClick={onOpenBrandGuide} 
                  className="text-left hover:text-[#0B192C] transition-colors cursor-pointer text-[#0B192C] font-semibold"
                >
                  Dossiê de Branding & Copy
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Segments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">Formatos Oficiais</h4>
            <ul className="space-y-2 text-xs text-[#5D5043]">
              <li>⭐ Novo: Sal Grosso Frasco de Vidro (250 g)</li>
              <li>⭐ Novo: Sal Marinho Pouch com Ziploc (500 g)</li>
              <li>Sal Fino Iodado com Moinho (250 g)</li>
              <li>Sal Rosa do Himalaia com Moinho (200 g)</li>
              <li>Sal Grosso Pouch Família (1 kg)</li>
              <li>Sal Fino Iodado em Saqueta (250 g)</li>
              <li>Sal Iodizado Grosso Industrial (Saco 25 kg)</li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">Contactos Directos</h4>
            <div className="space-y-2 text-xs text-[#3D3126]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B192C] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-[#0B192C] font-medium transition-colors">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B192C] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.emailCommercial}`} className="hover:text-[#0B192C] font-medium transition-colors">
                  {COMPANY_INFO.emailCommercial}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                <span>Origem & Sede: Benguela, Angola (Distribuição Luanda)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8C7B4] flex items-center justify-center text-[#5D5043] hover:text-[#0B192C] hover:border-[#0B192C] transition-all"
                aria-label="Instagram da Akoya Sal"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8C7B4] flex items-center justify-center text-[#5D5043] hover:text-[#0B192C] hover:border-[#0B192C] transition-all"
                aria-label="LinkedIn do Grupo Akoya"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D8C7B4] flex items-center justify-center text-[#5D5043] hover:text-[#0B192C] hover:border-[#0B192C] transition-all"
                aria-label="Facebook da Akoya Sal"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Quiet Copyright */}
        <div className="pt-8 border-t border-[#D8C7B4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736556]">
          <p>© {new Date().getFullYear()} AKOYA SAL · Grupo Akoya. Todos os direitos reservados. Benguela, Angola.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#1F1914] transition-colors">Termos & Condições B2B</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#1F1914] transition-colors">Certificado Laboratorial</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#1F1914] transition-colors">Política de Qualidade MINSA</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
