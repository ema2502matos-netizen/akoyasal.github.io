import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateB2BQuote,
  formatKwanza,
  formatUSD,
  validateB2BForm,
  generateWhatsAppProductOrderUrl
} from './akoyaLogic';
import { PRODUCTS, COMPANY_INFO } from '../data/akoyaData';

test('formatKwanza formats numbers into Angolan currency notation', () => {
  assert.equal(formatKwanza(18500), '18 500 Kz');
  assert.equal(formatKwanza(650), '650 Kz');
  assert.equal(formatKwanza(1250000), '1 250 000 Kz');
});

test('calculateB2BQuote calculates tiers and volume discounts correctly', () => {
  const quoteSmall = calculateB2BQuote(250, 'saco25kg');
  assert.equal(quoteSmall.discountPercent, 0);
  assert.equal(quoteSmall.sacksCount, 10);
  assert.equal(quoteSmall.palletsCount, 1);

  const quote1T = calculateB2BQuote(1000, 'saco25kg');
  assert.equal(quote1T.discountPercent, 7);
  assert.equal(quote1T.palletsCount, 1);
  assert.equal(quote1T.totalAOA < quote1T.subtotalAOA, true);

  const quote25T = calculateB2BQuote(25000, 'saco25kg');
  assert.equal(quote25T.discountPercent, 22);
  assert.equal(quote25T.totalUSD > 0, true);
});

test('validateB2BForm catches empty or invalid fields', () => {
  const invalid = validateB2BForm({
    companyName: '',
    contactPerson: '',
    email: 'invalid-email',
    phone: '',
    province: '',
    estimatedVolumeKg: 10
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.province);
  assert.ok(invalid.errors.estimatedVolumeKg);

  const valid = validateB2BForm({
    companyName: 'Restaurante Mar Sol Lda',
    contactPerson: 'Adão Manuel',
    email: 'compras@marsol.co.ao',
    phone: '+244923000111',
    province: 'Benguela',
    estimatedVolumeKg: 500
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppProductOrderUrl formats launch vs standard products differently', () => {
  // Launch product has launch price
  const launchProd = PRODUCTS.find(p => p.isLaunch)!;
  const launchUrl = generateWhatsAppProductOrderUrl(COMPANY_INFO.phoneRaw, launchProd, 2, 'Maria', 'Luanda');
  assert.ok(launchUrl.includes(encodeURIComponent('Preço de Lançamento')));

  // Standard product does not display fixed consumer price, but commercial quote
  const standardProd = PRODUCTS.find(p => !p.isLaunch)!;
  const standardUrl = generateWhatsAppProductOrderUrl(COMPANY_INFO.phoneRaw, standardProd, 10, 'Hotel Baía', 'Benguela');
  assert.ok(standardUrl.includes(encodeURIComponent('Solicitação de Cotação')));
});
