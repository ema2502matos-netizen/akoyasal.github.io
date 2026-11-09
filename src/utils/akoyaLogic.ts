import { Product, B2BQuoteRequest } from '../types/akoya';

export interface B2BQuoteEstimate {
  volumeKg: number;
  basePricePerKg: number;
  subtotalAOA: number;
  discountPercent: number;
  discountAmountAOA: number;
  totalAOA: number;
  totalUSD: number;
  palletsCount: number;
  sacksCount?: number;
  tierName: string;
}

export function formatKwanza(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} Kz`;
}

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calculateB2BQuote(
  volumeKg: number,
  productType: 'saco25kg' | 'retail_box' = 'saco25kg',
  exchangeRateUSD = 860
): B2BQuoteEstimate {
  const safeVolume = Math.max(25, volumeKg || 25);
  
  // Base commercial pricing index per kg in AOA for B2B industrial scale
  const basePricePerKg = productType === 'saco25kg' ? 620.0 : 2500.0;
  
  let discountPercent = 0;
  let tierName = 'Volume Padrão';

  if (safeVolume >= 25000) {
    discountPercent = 22;
    tierName = 'Camião Completo / Grande Indústria (-22%)';
  } else if (safeVolume >= 10000) {
    discountPercent = 18;
    tierName = 'Distribuição Provincial (-18%)';
  } else if (safeVolume >= 5000) {
    discountPercent = 12;
    tierName = 'Volume Corporativo / Grossista (-12%)';
  } else if (safeVolume >= 1000) {
    discountPercent = 7;
    tierName = 'Palete Inicial HORECA (-7%)';
  }

  const subtotalAOA = safeVolume * basePricePerKg;
  const discountAmountAOA = subtotalAOA * (discountPercent / 100);
  const totalAOA = subtotalAOA - discountAmountAOA;
  const totalUSD = totalAOA / exchangeRateUSD;

  // 1 standard pallet = approx 1,000 kg (40 sacks of 25kg)
  const palletsCount = Math.max(1, Math.ceil(safeVolume / 1000));
  const sacksCount = Math.ceil(safeVolume / 25);

  return {
    volumeKg: safeVolume,
    basePricePerKg,
    subtotalAOA,
    discountPercent,
    discountAmountAOA,
    totalAOA,
    totalUSD,
    palletsCount,
    sacksCount,
    tierName
  };
}

export function generateWhatsAppProductOrderUrl(
  phoneRaw: string,
  product: Product,
  quantity = 1,
  customerName = '',
  province = 'Luanda'
): string {
  const priceLine = product.isLaunch && product.launchPriceAOA
    ? `*Preço de Lançamento:* ${formatKwanza(product.launchPriceAOA * quantity)} (${quantity} un)`
    : `*Condições Comerciais:* Solicitação de Cotação (${quantity} un)`;

  const lines = [
    `Olá Akoya Sal! Gostaria de informações comerciais sobre este produto:`,
    ``,
    `*Produto:* ${product.name} (${product.weight})`,
    `*Categoria:* ${product.categoryLabel}`,
    `*Quantidade pretendida:* ${quantity} un`,
    priceLine,
    customerName ? `*Cliente/Empresa:* ${customerName}` : '',
    `*Província de Entrega:* ${province}`,
    ``,
    `Por favor, confirmem a disponibilidade de stock e catálogo comercial para a nossa região. Obrigado!`
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phoneRaw}?text=${encoded}`;
}

export function generateWhatsAppB2BRFQUrl(
  phoneRaw: string,
  rfq: B2BQuoteRequest,
  estimate: B2BQuoteEstimate
): string {
  const lines = [
    `*SOLICITAÇÃO DE COTAÇÃO B2B - AKOYA SAL*`,
    ``,
    `*Empresa:* ${rfq.companyName}`,
    `*Contacto:* ${rfq.contactPerson} (${rfq.phone})`,
    `*E-mail:* ${rfq.email}`,
    `*Província:* ${rfq.province}`,
    `*Sector:* ${rfq.businessType}`,
    `*Volume Estimado:* ${rfq.estimatedVolumeKg.toLocaleString()} kg (${estimate.palletsCount} paletes / ~${estimate.sacksCount} sacos de 25kg)`,
    `*Frequência:* ${rfq.deliveryFrequency}`,
    `*Escalão Proposto:* ${estimate.tierName}`,
    `*Valor Estimado:* ${formatKwanza(estimate.totalAOA)} (${formatUSD(estimate.totalUSD)})`,
    rfq.notes ? `*Observações:* ${rfq.notes}` : '',
    ``,
    `Solicitamos envio da Proposta Comercial e Ficha Técnica. Benguela/Luanda.`
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phoneRaw}?text=${encoded}`;
}

export function validateB2BForm(data: Partial<B2BQuoteRequest>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Por favor indique a razão social ou nome da empresa.';
  }
  if (!data.contactPerson || data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Indique o nome da pessoa de contacto.';
  }
  if (!data.phone || data.phone.trim().length < 8) {
    errors.phone = 'Indique um telefone ou WhatsApp válido de Angola.';
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Insira um e-mail corporativo válido.';
  }
  if (!data.province) {
    errors.province = 'Seleccione a província de entrega.';
  }
  if (!data.estimatedVolumeKg || data.estimatedVolumeKg < 25) {
    errors.estimatedVolumeKg = 'O volume mínimo B2B é de 25 kg (1 saco).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
