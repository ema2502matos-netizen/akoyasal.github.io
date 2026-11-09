import React, { useState } from 'react';
import { X, Check, MessageSquare, Utensils, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types/akoya';
import { COMPANY_INFO } from '../data/akoyaData';
import { formatKwanza, generateWhatsAppProductOrderUrl } from '../utils/akoyaLogic';
import { TiltCard } from './TiltCard';
import { SaltSprinkleButton } from './SaltSprinkleButton';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenB2BQuote: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenB2BQuote
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Luanda');

  const totalPriceAOA = product.isLaunch && product.launchPriceAOA
    ? product.launchPriceAOA * quantity
    : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#FAF6F0] border border-[#D8C7B4] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2D5C4] bg-[#EDE4D8]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B192C]">
              Ficha Técnica & Encomenda
            </span>
            <span className="text-[#A89887]">·</span>
            <span className="text-xs text-[#5C4D3E] font-medium">{product.categoryLabel}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4D3E] hover:text-[#1F1914] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Product Image with TiltCard */}
            <div className="md:col-span-5">
              <TiltCard maxTilt={8} scale={1.02} glare={true}>
                <div className="rounded-xl overflow-hidden border border-[#D8C7B4] bg-[#EFE8DD] aspect-square relative flex items-center justify-center p-3 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#0B192C] text-[11px] font-bold text-white shadow-xs">
                    {product.weight}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <SaltSprinkleButton label="Salpicar" />
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Product Information */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 id="product-modal-title" className="font-display text-2xl font-bold text-[#1F1914]">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-[#B88939] mt-0.5">{product.subtitle}</p>
                
                {/* Price only if launch */}
                <div className="mt-2.5">
                  {product.isLaunch && product.launchPriceAOA ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#0B192C]">
                        {formatKwanza(product.launchPriceAOA)}
                      </span>
                      <span className="text-xs font-semibold text-[#B88939] uppercase tracking-wider">
                        Preço Especial de Lançamento
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-[#EDE4D8] border border-[#D8C7B4] inline-block">
                      <span className="text-xs font-bold text-[#1F1914] block">
                        Condição Comercial: {product.priceNote || 'Sob Consulta / Distribuição'}
                      </span>
                      <span className="text-[11px] text-[#6C5F53]">
                        Preços e propostas escalonadas sob solicitação directa.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4E4135] leading-relaxed">
                {product.fullCopy}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] text-xs">
                <div>
                  <span className="text-[#736556] block text-[11px] font-medium">Granulometria:</span>
                  <span className="text-[#1F1914] font-bold">{product.granulometry}</span>
                </div>
                <div>
                  <span className="text-[#736556] block text-[11px] font-medium">Teor de Iodo:</span>
                  <span className="text-[#1F1914] font-bold">{product.iodineContent}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#D8C7B4]">
                  <span className="text-[#736556] block text-[11px] font-medium">Tipo de Embalagem:</span>
                  <span className="text-[#3D3126]">{product.packaging}</span>
                </div>
              </div>

              {/* Angolan Gastronomy Pairing */}
              <div className="p-3 rounded-xl bg-[#F4EDE2] border border-[#D1BFAB] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#0B192C] font-bold">
                  <Utensils className="w-3.5 h-3.5 text-[#B88939]" />
                  <span>Sugestão Culinária: {product.angolanDishPairing.dishName}</span>
                </div>
                <p className="text-[#5C4D3E] leading-normal">{product.angolanDishPairing.description}</p>
              </div>
            </div>
          </div>

          {/* Key Product Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">
              Garantias & Benefícios de Origem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#4E4135]">
                  <Check className="w-3.5 h-3.5 text-[#0B192C] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Inquiry & Order Form */}
          <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F1914] uppercase tracking-wider">
                Solicitar Encomenda ou Informação Comercial
              </span>
              {totalPriceAOA && (
                <span className="text-xs text-[#0B192C] font-bold">
                  Total Lançamento: {formatKwanza(totalPriceAOA)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#5C4D3E] mb-1 font-semibold">Quantidade Pretendida</label>
                <div className="flex items-center border border-[#CDBBA7] rounded-lg bg-[#FAF6F0]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-[#1F1914] hover:text-[#0B192C] font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-bold text-[#1F1914]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-[#1F1914] hover:text-[#0B192C] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#5C4D3E] mb-1 font-semibold">Seu Nome / Razão Social</label>
                <input
                  type="text"
                  placeholder="Ex: Teresa Benguela / Restaurante Mar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#5C4D3E] mb-1 font-semibold">Província de Entrega</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                >
                  <option value="Luanda">Luanda</option>
                  <option value="Benguela">Benguela</option>
                  <option value="Huambo">Huambo</option>
                  <option value="Huíla">Huíla (Lubango)</option>
                  <option value="Cuanza Sul">Cuanza Sul (Sumbe)</option>
                  <option value="Outra Província">Outra Província</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={generateWhatsAppProductOrderUrl(COMPANY_INFO.phoneRaw, product, quantity, customerName, selectedProvince)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-lg transition-all text-center shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                <span>Confirmar Encomenda no WhatsApp Oficial</span>
              </a>

              {product.category === 'industrial' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenB2BQuote(product.id);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#1F1914] bg-[#FAF6F0] hover:bg-[#F2ECE1] border border-[#CDBBA7] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Pedir Cotação B2B (Paletes)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
