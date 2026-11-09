import React, { useState } from 'react';
import { X, Copy, Check, FileText, Palette, Code2, Sparkles, Layers, BookOpen } from 'lucide-react';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'copy' | 'nocode' | 'branding' | 'sitemap'>('copy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const FULL_COPY_EXPORT = `
=========================================
DOSSIÊ DE BRANDING & COPYWRITING: AKOYA SAL
Tema: Areia Dourada & Dunas de Benguela
Slogan: "Essência natural da nossa terra."
Tagline: "Qualidade que se vê, confiança que se sente."
Origem: Benguela, Angola · Grupo Akoya
=========================================

1. HERO SECTION (ABERTURA DO SITE)
----------------------------------
Título Principal (H1):
"O sal mais puro de Angola, colhido onde o sol abraça o Atlântico."

Subtítulo de Vendas:
"Produzido em Benguela a partir da evaporação solar da água do mar em dunas cristalinas. 100% natural, iodizado para a saúde da sua família e refinado segundo padrões internacionais para a mesa dos lares, hotelaria e grandes indústrias."

Botões de Ação (CTAs):
- CTA Primário: "Explorar Produtos & Lançamentos"
- CTA Secundário (B2B): "Seja um Distribuidor B2B"

Micro-provas de autoridade:
- 01. Origem Local: Benguela, Angola (evaporação solar limpa)
- 02. Saúde Pública: 100% Iodizado (normas oficiais MINSA)
- 03. Portfólio: Gama Completa (de 200g a sacos industriais de 25 kg)
- 04. Logística: Distribuição Nacional (18 províncias de Angola)

2. POLÍTICA DE PREÇOS (CONFORME DIRETRIZ ESTRATÉGICA)
-----------------------------------------------------
- Produtos de Catálogo Padrão: Sem exibição de preço para não canibalizar margens de distribuidores. Exibição de "Sob Consulta Comercial / Cotação B2B".
- Novos Lançamentos Oficiais (com preço de introdução visível):
  * Sal Grosso em Frasco de Vidro com Selo (250 g): 1 950 Kz (~$2.25)
  * Sal Marinho Stand-Up Pouch com Ziploc (500 g): 1 250 Kz (~$1.45)

3. A HISTÓRIA E PUREZA (O SIGNIFICADO DE AKOYA)
------------------------------------------------
"Porquê AKOYA? Na tradição universal dos mares, a pérola Akoya é famosa por ser a mais luminosa, esférica e pura pérola oceânica cultivada. Da mesma forma, o AKOYA SAL nasce no litoral de Benguela como uma verdadeira pérola mineral: 100% natural, sem químicos industriais e cristalizado pela generosidade do sol e do mar angolano."

Etapas do Processo "Do Mar ao Saleiro":
1. Captação & Evaporação Solar (Água cristalina do litoral concentrada pelo sol e vento litorâneo).
2. Cristalização & Colheita Artesanal (Formação de pirâmides de sal colhidas no tempo ideal).
3. Refinação & Iodização Mecanizada (Lavagem, secagem e doseamento mecânico certificado de iodo).
4. Embalamento & Rastreabilidade Total (Lote, data de produção e validade em cada embalagem).

4. B2B & NETWORKING CORPORATIVO
-------------------------------
"Procura um fornecedor de sal de origem angolana, com produto consistente e embalagem à medida do seu negócio?
- Abastecimento contínuo a partir de Benguela e Luanda.
- Descontos progressivos até -22% por camião completo (25 a 30 toneladas).
- Fichas laboratoriais emitidas por lote para auditorias sanitárias.
- Contacto direto: +244 930 157 794 | comercial@akoyagrupo.com"
`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF6F0] border border-[#D8C7B4] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2D5C4] bg-[#EDE4D8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#C5A059] shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F1914] flex items-center gap-2">
                <span>Dossiê Estratégico: AKOYA SAL</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0B192C] text-[#E5C378]">
                  Tema Areia · Copy & No-Code
                </span>
              </h3>
              <p className="text-xs text-[#5D5043]">
                Estrutura completa, diretrizes de marca e textos prontos para implementação.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5D5043] hover:text-[#1F1914] rounded-lg hover:bg-black/5 cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#F4EDE2] border-b border-[#D8C7B4] overflow-x-auto">
          <button
            onClick={() => setActiveTab('copy')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'copy'
                ? 'bg-[#0B192C] text-white font-bold shadow-xs'
                : 'text-[#4E4135] hover:text-[#0B192C] hover:bg-[#EDE4D8]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Copywriting Completo (Pronto a Copiar)</span>
          </button>
          <button
            onClick={() => setActiveTab('nocode')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'nocode'
                ? 'bg-[#0B192C] text-white font-bold shadow-xs'
                : 'text-[#4E4135] hover:text-[#0B192C] hover:bg-[#EDE4D8]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Implementação No-Code & Animações</span>
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-[#0B192C] text-white font-bold shadow-xs'
                : 'text-[#4E4135] hover:text-[#0B192C] hover:bg-[#EDE4D8]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Diretrizes Visuais do Tema Areia</span>
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sitemap'
                ? 'bg-[#0B192C] text-white font-bold shadow-xs'
                : 'text-[#4E4135] hover:text-[#0B192C] hover:bg-[#EDE4D8]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Estrutura do Site & Funil</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#4E4135]">
          {activeTab === 'copy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4]">
                <div>
                  <span className="text-[#1F1914] font-bold block text-sm">Textos Oficiais & Posicionamento de Vendas</span>
                  <span className="text-[#6C5F53]">Inclui regras de preços (lançamentos vs consulta comercial), histórias e scripts B2B.</span>
                </div>
                <button
                  onClick={() => handleCopy(FULL_COPY_EXPORT, 'full_copy')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B192C] text-white font-bold hover:bg-[#132845] transition-all cursor-pointer shadow-xs"
                >
                  {copiedKey === 'full_copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
                  <span>{copiedKey === 'full_copy' ? 'Copiado!' : 'Copiar Todo o Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4] space-y-4">
                <div className="space-y-1">
                  <span className="text-[#0B192C] font-bold uppercase tracking-wider block">1. Hero Section</span>
                  <p className="font-bold text-[#1F1914] text-sm">H1: "O sal mais puro de Angola, colhido onde o sol abraça o Atlântico."</p>
                  <p className="text-[#5D5043]">
                    Subtítulo: "Produzido em Benguela a partir da evaporação solar da água do mar em dunas cristalinas. 100% natural, iodizado para a saúde da sua família e refinado segundo padrões internacionais para a mesa dos lares, hotelaria e grandes indústrias."
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5D8C8] space-y-1">
                  <span className="text-[#0B192C] font-bold uppercase tracking-wider block">2. Política de Preços Exclusiva para Lançamentos</span>
                  <p className="text-[#4E4135]">
                    Os produtos tradicionais preservam a discrição de margem para os canais de revenda com a menção <strong>"Sob Consulta Comercial / Distribuição"</strong>. Apenas os novos lançamentos trazem o preço de mercado destacado:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[#5D5043] pt-1">
                    <li><strong className="text-[#1F1914]">Novo Sal Grosso em Frasco de Vidro (250g):</strong> 1 950 Kz</li>
                    <li><strong className="text-[#1F1914]">Novo Sal Marinho Stand-Up Pouch (500g):</strong> 1 250 Kz</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E5D8C8] space-y-2">
                  <span className="text-[#0B192C] font-bold uppercase tracking-wider block">3. História da Pérola Akoya</span>
                  <p className="text-[#5D5043]">
                    "Assim como a pérola Akoya é a mais perfeita e brilhante joia cultivada no oceano, o AKOYA SAL nasce da generosidade natural das areias e mar de Benguela. Um sal marinho límpido, colhido sob o sol e vento tropical, sem agentes químicos de branqueamento e naturalmente mineralizado."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nocode' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#1F1914] mb-2">
                  Implementação no WordPress + Elementor Pro (Tema Areia)
                </h4>
                <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-2 text-[#4E4135]">
                  <p>1. <strong className="text-[#1F1914]">Cor de Fundo Global:</strong> No painel "Site Settings &gt; Background", defina a cor primária como <code className="bg-[#FAF6F0] px-1 rounded text-[#0B192C]">#F6F1EA</code> (areia natural) e superfícies dos containers como <code className="bg-[#FAF6F0] px-1 rounded text-[#0B192C]">#FAF6F0</code>.</p>
                  <p>2. <strong className="text-[#1F1914]">Efeito Parallax no Hero:</strong> No container de fundo das dunas, active "Motion Effects &gt; Scrolling Effects &gt; Vertical Scroll" com velocidade 2.0 para uma sensação fluida de profundidade.</p>
                  <p>3. <strong className="text-[#1F1914]">Flip Card Interativo:</strong> Use o widget "Flip Box" com estilo 3D Cube para alternar entre a foto do produto e a sugestão de prato angolano.</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1F1914] mb-2">
                  Implementação no Framer ou Webflow
                </h4>
                <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-2 text-[#4E4135]">
                  <p>1. <strong className="text-[#1F1914]">Framer Scroll Transforms:</strong> Vincule o progresso de scroll da secção à opacidade e escala sutil das dunas de Benguela.</p>
                  <p>2. <strong className="text-[#1F1914]">Micro-interação nos Potes e Saquetas:</strong> Adicione uma leve rotação de 3D tilt ao passar o rato (hover) para simular o reflexo na embalagem de vidro.</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1F1914] mb-2">
                  Trechos de Código CSS Dinâmico (Tema Areia)
                </h4>
                <div className="p-3.5 rounded-xl bg-[#0B192C] font-mono text-[11px] text-[#E5C378] space-y-2 overflow-x-auto">
                  <pre>{`/* Brilho dourado solar nos cristais de sal */
@keyframes sandSolarGlow {
  0% { box-shadow: 0 4px 12px rgba(184, 137, 57, 0.15); }
  50% { box-shadow: 0 8px 24px rgba(184, 137, 57, 0.35); }
  100% { box-shadow: 0 4px 12px rgba(184, 137, 57, 0.15); }
}

.sand-card-hover:hover {
  animation: sandSolarGlow 3s infinite ease-in-out;
}`}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#1F1914] mb-3">Paleta do Tema Areia & Dunas de Benguela</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                    <div className="w-full h-8 rounded-lg bg-[#F6F1EA] border border-[#D8C7B4] mb-2" />
                    <span className="font-bold text-[#1F1914] block">Areia Natural</span>
                    <span className="text-[#6C5F53] font-mono">#F6F1EA</span>
                    <span className="text-[10px] text-[#736556] block mt-0.5">Fundo Principal (60%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                    <div className="w-full h-8 rounded-lg bg-[#FAF6F0] border border-[#D8C7B4] mb-2" />
                    <span className="font-bold text-[#1F1914] block">Areia Marfim</span>
                    <span className="text-[#6C5F53] font-mono">#FAF6F0</span>
                    <span className="text-[10px] text-[#736556] block mt-0.5">Superfícies/Cards (30%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                    <div className="w-full h-8 rounded-lg bg-[#0B192C] mb-2" />
                    <span className="font-bold text-[#1F1914] block">Azul Akoya</span>
                    <span className="text-[#6C5F53] font-mono">#0B192C</span>
                    <span className="text-[10px] text-[#736556] block mt-0.5">Identidade & Embalagens</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                    <div className="w-full h-8 rounded-lg bg-[#C5A059] mb-2" />
                    <span className="font-bold text-[#1F1914] block">Ouro Solar</span>
                    <span className="text-[#6C5F53] font-mono">#C5A059</span>
                    <span className="text-[10px] text-[#736556] block mt-0.5">Destaques & Lançamentos</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1F1914] mb-2">Tipografia Institucional</h4>
                <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-3">
                  <div>
                    <span className="text-[#1F1914] font-bold block">Display & Titulares: Outfit / Plus Jakarta Sans</span>
                    <p className="text-[#5D5043]">Linhas geométricas e modernas que casam perfeitamente com o logótipo Akoya Sal.</p>
                  </div>
                  <div className="pt-2 border-t border-[#D8C7B4]">
                    <span className="text-[#1F1914] font-bold block">Corpo & Números: Plus Jakarta Sans</span>
                    <p className="text-[#5D5043]">Alta legibilidade em ecrãs móveis e tabelas de composição nutricional.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#1F1914] mb-1">
                Arquitetura de Páginas & Funil de Conversão Triplo
              </h4>
              <p className="text-[#5D5043]">
                O site foi estruturado para cumprir em simultâneo os três objetivos do cliente com zero atrito:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                  <span className="text-[#0B192C] font-bold block">1. Funil de Vendas de Novos Lançamentos</span>
                  <p className="text-[#5D5043] mt-0.5">
                    Hero &gt; Selos de Lançamento no Catálogo &gt; Preço Promocional Destacado &gt; Checkout Directo no WhatsApp Oficial.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                  <span className="text-[#0B192C] font-bold block">2. Funil de Parcerias Corporativas B2B</span>
                  <p className="text-[#5D5043] mt-0.5">
                    B2B &gt; Simulador Interativo de Volume (Sacos 25 kg e Paletes) &gt; Cálculo de Escalão de Desconto &gt; Envio de Cotação Comercial.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#D8C7B4]">
                  <span className="text-[#0B192C] font-bold block">3. Construção de Marca & Orgulho Angolano</span>
                  <p className="text-[#5D5043] mt-0.5">
                    História da Pérola Akoya &gt; Infográfico "Do Mar ao Saleiro" &gt; Receitas Gastronómicas de Angola &gt; Selo Oficial de Benguela / MINSA.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
