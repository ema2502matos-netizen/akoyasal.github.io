import React, { useState } from 'react';
import { Building2, Calculator, Send, CheckCircle2 } from 'lucide-react';
import { B2BQuoteRequest } from '../types/akoya';
import { B2B_CHANNELS, PROVINCES_OF_ANGOLA, COMPANY_INFO } from '../data/akoyaData';
import { calculateB2BQuote, formatKwanza, formatUSD, validateB2BForm, generateWhatsAppB2BRFQUrl } from '../utils/akoyaLogic';

interface B2BSectionProps {
  initialProductId?: string;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ initialProductId }) => {
  const [volumeKg, setVolumeKg] = useState<number>(2500);
  const [productType, setProductType] = useState<'saco25kg' | 'retail_box'>('saco25kg');

  const [formData, setFormData] = useState<Partial<B2BQuoteRequest>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    province: 'Luanda',
    businessType: 'supermarket',
    selectedProduct: initialProductId || 'sal-iodizado-grosso-saco-25kg',
    deliveryFrequency: 'monthly',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const estimate = calculateB2BQuote(volumeKg, productType);

  const handleInputChange = (field: keyof B2BQuoteRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleQuickVolume = (kg: number) => {
    setVolumeKg(kg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullRequest: B2BQuoteRequest = {
      companyName: formData.companyName || '',
      contactPerson: formData.contactPerson || '',
      email: formData.email || '',
      phone: formData.phone || '',
      province: formData.province || 'Luanda',
      businessType: formData.businessType || 'supermarket',
      selectedProduct: formData.selectedProduct || 'sal-iodizado-grosso-saco-25kg',
      estimatedVolumeKg: volumeKg,
      deliveryFrequency: formData.deliveryFrequency || 'monthly',
      notes: formData.notes
    };

    const validation = validateB2BForm(fullRequest);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitted(true);

    // Open WhatsApp link with prefilled payload
    const whatsappUrl = generateWhatsAppB2BRFQUrl(COMPANY_INFO.phoneRaw, fullRequest, estimate);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="b2b" className="py-24 bg-[#EFE8DE] relative border-t border-[#D8C7B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Parcerias Corporativas & Atacado</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-4">
            Fornecimento B2B & Parcerias Estratégicas em Angola
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            Abastecimento industrial regular, preços por escala e padrão de refinação internacional para supermercados, redes hoteleiras, restaurantes e grossistas das 18 províncias.
          </p>
        </div>

        {/* 4 B2B Channels Cards in Sand Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {B2B_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-xs space-y-3"
            >
              <h3 className="text-base font-bold text-[#1F1914]">{ch.title}</h3>
              <p className="text-xs text-[#5D5043] leading-relaxed">{ch.description}</p>
              <div className="pt-2 border-t border-[#E5D8C8]">
                <span className="text-[10px] uppercase font-bold text-[#0B192C] block">
                  Formato Recomendado
                </span>
                <span className="text-xs text-[#1F1914] font-semibold">{ch.recommendedFormat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulator & Quote Form Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dynamic Interactive Simulator */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-[#0B192C]" />
                <h3 className="text-lg font-bold text-[#1F1914]">Simulador de Volume & Cotação</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0B192C] text-[#C5A059]">
                Tempo Real
              </span>
            </div>

            {/* Product Format Switch */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3D3126] block">Formato Desejado</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#EDE4D8] rounded-xl border border-[#D8C7B4]">
                <button
                  type="button"
                  onClick={() => setProductType('saco25kg')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    productType === 'saco25kg'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'text-[#5C4D3E] hover:text-[#0B192C]'
                  }`}
                >
                  Sacos Industriais 25 kg
                </button>
                <button
                  type="button"
                  onClick={() => setProductType('retail_box')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    productType === 'retail_box'
                      ? 'bg-[#0B192C] text-white shadow-xs'
                      : 'text-[#5C4D3E] hover:text-[#0B192C]'
                  }`}
                >
                  Caixas de Retalho
                </button>
              </div>
            </div>

            {/* Volume Input & Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3D3126]">Volume de Compra Estimado:</span>
                <span className="font-mono text-base font-bold text-[#0B192C]">
                  {volumeKg.toLocaleString()} kg
                </span>
              </div>

              <input
                type="range"
                min="25"
                max="30000"
                step="25"
                value={volumeKg}
                onChange={(e) => setVolumeKg(Number(e.target.value))}
                className="w-full accent-[#0B192C] h-2 bg-[#EDE4D8] rounded-lg cursor-pointer"
              />

              {/* Quick Volume Presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
                {[
                  { label: '250 kg (10 sacos)', val: 250 },
                  { label: '1.000 kg (1 palete)', val: 1000 },
                  { label: '5.000 kg (5 paletes)', val: 5000 },
                  { label: '15.000 kg', val: 15000 },
                  { label: '25 Ton (Camião)', val: 25000 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => handleQuickVolume(preset.val)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                      volumeKg === preset.val
                        ? 'bg-[#0B192C] text-white font-bold border-[#0B192C]'
                        : 'bg-[#EDE4D8] text-[#5C4D3E] border-[#D1BFAB] hover:border-[#0B192C]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown Card */}
            <div className="p-4 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#5D5043]">
                <span>Escalão Tarifário:</span>
                <span className="text-[#0B192C] font-bold">{estimate.tierName}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#5D5043]">
                <span>Equivalência Logística:</span>
                <span className="text-[#1F1914] font-medium">
                  ~{estimate.sacksCount} sacos ({estimate.palletsCount} paletes)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#5D5043]">
                <span>Desconto por Escala:</span>
                <span className="text-emerald-700 font-bold">
                  {estimate.discountPercent > 0 ? `-${estimate.discountPercent}% (${formatKwanza(estimate.discountAmountAOA)})` : 'Sem desconto de volume'}
                </span>
              </div>

              <div className="pt-3 border-t border-[#D8C7B4] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#5D5043] block">Estimativa B2B Indicativa:</span>
                  <span className="text-2xl font-extrabold text-[#0B192C]">
                    {formatKwanza(estimate.totalAOA)}
                  </span>
                </div>
                <span className="text-xs text-[#5C4D3E] font-mono">
                  {formatUSD(estimate.totalUSD)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#6C5F53] italic leading-tight">
              *Valores indicativos sujeitos a confirmação de frete e condições comerciais a 30/60 dias para clientes certificados.
            </p>
          </div>

          {/* Right: Dynamic RFQ Form in Sand */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#1F1914]">Solicitar Proposta Formal & Ficha Laboratorial</h3>
              <p className="text-xs text-[#5D5043] mt-1">
                Preencha os dados abaixo. O nosso departamento comercial emitirá a cotação oficial em menos de 2 horas úteis.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#EDE4D8] border border-[#0B192C] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#0B192C] mx-auto" />
                <h4 className="text-lg font-bold text-[#1F1914]">Pedido de Cotação Encaminhado!</h4>
                <p className="text-xs text-[#4E4135] max-w-md mx-auto">
                  A mensagem foi preparada para o WhatsApp oficial da Akoya Sal (+244 930 157 794). Um gestor de conta corporativo entrará em contacto directo.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#1F1914] bg-[#FAF6F0] border border-[#D8C7B4] hover:bg-[#F2ECE1] rounded-md cursor-pointer"
                  >
                    Fazer Nova Simulação
                  </button>
                  <a
                    href={`mailto:${COMPANY_INFO.emailCommercial}`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0B192C] rounded-md"
                  >
                    Enviar por E-mail
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Nome da Empresa / Razão Social *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Grupo Alimentar Kwanza Lda"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className={`w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border rounded-lg focus:border-[#0B192C] outline-none transition-colors ${
                        errors.companyName ? 'border-red-500' : 'border-[#CDBBA7]'
                      }`}
                    />
                    {errors.companyName && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.companyName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Pessoa de Contacto & Cargo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Dr. Manuel Santos (Director de Compras)"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className={`w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border rounded-lg focus:border-[#0B192C] outline-none transition-colors ${
                        errors.contactPerson ? 'border-red-500' : 'border-[#CDBBA7]'
                      }`}
                    />
                    {errors.contactPerson && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.contactPerson}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Telefone / WhatsApp Comercial *
                    </label>
                    <input
                      type="tel"
                      placeholder="+244 923 000 000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border rounded-lg focus:border-[#0B192C] outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#CDBBA7]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      placeholder="compras@empresa.co.ao"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border rounded-lg focus:border-[#0B192C] outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#CDBBA7]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-600 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Sector de Actividade *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                    >
                      <option value="supermarket">Supermercado / Grande Superfície</option>
                      <option value="restaurant_hotel">Hotelaria / Restaurante (HORECA)</option>
                      <option value="distributor">Distribuidor Grossista Provincial</option>
                      <option value="food_industry">Indústria Alimentar / Panificação</option>
                      <option value="other">Outro Sector</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Província de Entrega *
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                    >
                      {PROVINCES_OF_ANGOLA.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Frequência de Abastecimento
                    </label>
                    <select
                      value={formData.deliveryFrequency}
                      onChange={(e) => handleInputChange('deliveryFrequency', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                    >
                      <option value="monthly">Mensal Programado</option>
                      <option value="biweekly">Quinzenal</option>
                      <option value="weekly">Semanal</option>
                      <option value="one_time">Compra Pontual / Encomenda Única</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D3126] mb-1">
                      Observações / Requisitos
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Necessidade de descarga paletizada com empilhador"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#1F1914] bg-[#FAF6F0] border border-[#CDBBA7] rounded-lg focus:border-[#0B192C] outline-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C5A059]" />
                    <span>Enviar Pedido de Cotação via WhatsApp & E-mail</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
