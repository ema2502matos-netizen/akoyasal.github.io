import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Utensils, ArrowUpRight, Sparkles, Tag, Eye } from 'lucide-react';
import { Product, ProductCategory } from '../types/akoya';
import { PRODUCTS, COMPANY_INFO } from '../data/akoyaData';
import { formatKwanza, generateWhatsAppProductOrderUrl } from '../utils/akoyaLogic';
import { TiltCard } from './TiltCard';
import { SaltSprinkleButton } from './SaltSprinkleButton';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onOpenB2BQuote: (preselectedProduct?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onOpenB2BQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [activeCardView, setActiveCardView] = useState<Record<string, 'product' | 'recipe'>>({});

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'launch') return p.isLaunch;
    return p.category === activeCategory;
  });

  const toggleView = (productId: string, view: 'product' | 'recipe') => {
    setActiveCardView((prev) => ({ ...prev, [productId]: view }));
  };

  return (
    <section id="produtos" className="py-24 bg-[#F6F1EA] relative border-t border-[#D8C7B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Catálogo Oficial & Novos Lançamentos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight">
              A Gama Completa AKOYA SAL
            </h2>
            <p className="text-sm sm:text-base text-[#5D5043] mt-2 max-w-xl">
              Do requinte de mesa aos novos lançamentos de 500g e frasco de vidro, com fornecimento para lares, alta gastronomia e sacos industriais de 25 kg.
            </p>
          </div>

          {/* Dynamic Filter Tabs in Sand/Navy Design */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#EDE4D8] rounded-xl border border-[#D8C7B4] self-start md:self-auto overflow-x-auto max-w-full shadow-2xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#5C4D3E] hover:text-[#0B192C]'
              }`}
            >
              Todos os Produtos
            </button>
            <button
              onClick={() => setActiveCategory('launch')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'launch'
                  ? 'bg-[#0B192C] text-[#E5C378] shadow-xs'
                  : 'text-[#B88939] font-bold hover:text-[#0B192C]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#B88939]" />
              <span>Novos Lançamentos</span>
            </button>
            <button
              onClick={() => setActiveCategory('gourmet')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'gourmet'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#5C4D3E] hover:text-[#0B192C]'
              }`}
            >
              Mesa & Gourmet (Moinho)
            </button>
            <button
              onClick={() => setActiveCategory('retail')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'retail'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#5C4D3E] hover:text-[#0B192C]'
              }`}
            >
              Cozinha Diária (Pouch & Saqueta)
            </button>
            <button
              onClick={() => setActiveCategory('industrial')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'industrial'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-[#5C4D3E] hover:text-[#0B192C]'
              }`}
            >
              B2B & Indústria (25 kg)
            </button>
          </div>
        </div>

        {/* Product Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentView = activeCardView[product.id] || 'product';

            return (
              <TiltCard
                key={product.id}
                maxTilt={6}
                scale={1.015}
                glare={true}
                className="h-full"
              >
                <div
                  className={`group flex flex-col h-full rounded-2xl bg-[#FAF6F0] border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-lg ${
                    product.isLaunch 
                      ? 'border-[#C5A059] ring-1 ring-[#C5A059]/40' 
                      : 'border-[#D8C7B4] hover:border-[#B88939]'
                  }`}
                >
                  {/* Visual Showcase with uploaded packshot & interactive toggle */}
                  <div className="relative h-72 bg-[#EFE8DD] overflow-hidden flex items-center justify-center p-3">
                    {currentView === 'product' ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col justify-between p-4 pb-12 bg-[#EDE4D8] rounded-xl border border-[#D1BFAB] text-left overflow-y-auto">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[#0B192C] text-[10px] font-bold uppercase tracking-wider">
                              <Utensils className="w-3.5 h-3.5 text-[#B88939]" />
                              <span>Harmonização Angolana</span>
                            </div>
                            <SaltSprinkleButton label="Salpicar" />
                          </div>
                          <h4 className="text-xs font-bold text-[#1F1914]">
                            {product.angolanDishPairing.dishName}
                          </h4>
                          <p className="text-[11px] text-[#5C4D3E] leading-relaxed line-clamp-3">
                            {product.angolanDishPairing.description}
                          </p>
                        </div>
                        <div className="p-2 rounded-lg bg-[#FAF6F0] border border-[#D8C7B4] mt-1">
                          <span className="text-[9px] text-[#0B192C] font-bold block uppercase">Dica do Chef</span>
                          <p className="text-[10px] text-[#6C5F53] italic line-clamp-2">"{product.angolanDishPairing.chefTip}"</p>
                        </div>
                      </div>
                    )}

                    {/* Launch Badge or Status Badge */}
                    {product.isLaunch ? (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B192C] text-[#E5C378] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" />
                        <span>Lançamento</span>
                      </div>
                    ) : product.badge ? (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#FAF6F0]/90 backdrop-blur-xs border border-[#D8C7B4] text-[10px] font-bold text-[#4D4034] tracking-wider uppercase">
                        {product.badge}
                      </div>
                    ) : null}

                    {/* Weight tag */}
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-[#0B192C]/80 backdrop-blur-xs text-[11px] font-bold text-white">
                      {product.weight}
                    </div>

                    {/* Interactive View Switcher */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-center gap-1.5 p-1 bg-[#FAF6F0]/95 backdrop-blur-md rounded-lg border border-[#D8C7B4] shadow-xs">
                      <button
                        onClick={() => toggleView(product.id, 'product')}
                        className={`flex-1 text-[11px] py-1 font-semibold rounded-md text-center cursor-pointer transition-colors ${
                          currentView === 'product' ? 'bg-[#0B192C] text-white' : 'text-[#6C5F53] hover:text-[#0B192C]'
                        }`}
                      >
                        Embalagem
                      </button>
                      <button
                        onClick={() => toggleView(product.id, 'recipe')}
                        className={`flex-1 text-[11px] py-1 font-semibold rounded-md text-center cursor-pointer transition-colors ${
                          currentView === 'recipe' ? 'bg-[#0B192C] text-[#E5C378]' : 'text-[#6C5F53] hover:text-[#0B192C]'
                        }`}
                      >
                        Prato Ideal
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#B88939] uppercase tracking-wider block">
                        {product.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-[#1F1914] group-hover:text-[#0B192C] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5D5043] line-clamp-2 leading-relaxed">
                        {product.shortCopy}
                      </p>
                    </div>

                    {/* Pricing / Commercial Status Area (LAUNCH ONLY HAS PRICE!) */}
                    <div className="pt-3 border-t border-[#E5D8C8] flex items-center justify-between">
                      <div>
                        {product.isLaunch && product.launchPriceAOA ? (
                          <div>
                            <span className="text-[10px] font-bold text-[#0B192C] uppercase tracking-wider block flex items-center gap-1">
                              <Tag className="w-3 h-3 text-[#B88939]" />
                              Preço de Lançamento
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-base font-extrabold text-[#0B192C]">
                                {formatKwanza(product.launchPriceAOA)}
                              </span>
                              <span className="text-[11px] text-[#6C5F53]">
                                (~${product.launchPriceUSD?.toFixed(2)})
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#736556] font-medium block">
                              Condição Comercial
                            </span>
                            <span className="text-xs font-bold text-[#1F1914]">
                              {product.priceNote || 'Sob Consulta Comercial'}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-2 rounded-lg bg-[#EDE4D8] hover:bg-[#E2D5C4] text-[#0B192C] border border-[#D1BFAB] transition-colors cursor-pointer"
                        title="Ver Ficha Técnica Completa"
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Actions: Direct WhatsApp Order or B2B Quote */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={generateWhatsAppProductOrderUrl(COMPANY_INFO.phoneRaw, product, 1)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152E52] rounded-lg transition-all text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{product.isLaunch ? 'Encomendar' : 'WhatsApp'}</span>
                      </a>

                      <button
                        onClick={() => {
                          if (product.category === 'industrial') {
                            onOpenB2BQuote(product.id);
                          } else {
                            onSelectProduct(product);
                          }
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#2D2319] bg-[#EDE4D8] hover:bg-[#E2D5C4] border border-[#D1BFAB] rounded-lg transition-all cursor-pointer text-center"
                      >
                        <span>{product.category === 'industrial' ? 'Cotação B2B' : 'Detalhes'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* B2B In-section Banner in Sand/Navy */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EDE4D8] border border-[#D8C7B4] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B192C] flex items-center justify-center text-[#C5A059] shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1F1914]">
                Abastecimento B2B Programado para Supermercados, Restaurantes e Indústrias
              </h4>
              <p className="text-xs text-[#5D5043] mt-0.5">
                Preços por escala, faturas comerciais com NIF e entregas paletizadas em qualquer província de Angola.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenB2BQuote()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-lg shadow-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            Aceder ao Simulador B2B
          </button>
        </div>
      </div>
    </section>
  );
};
