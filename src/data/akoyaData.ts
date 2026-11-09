import { Product, Recipe, Testimonial, ProcessStep, FacilityPhoto } from '../types/akoya';

export const COMPANY_INFO = {
  brandName: 'AKOYA SAL',
  groupName: 'Grupo Akoya',
  slogan: 'Essência natural da nossa terra.',
  secondarySlogan: 'Qualidade que se vê, confiança que se sente.',
  originClaim: 'Do sal de Benguela para a mesa de Angola.',
  phoneDisplay: '+244 930 157 794',
  phoneRaw: '244930157794',
  emailCommercial: 'comercial@akoyagrupo.com',
  originCity: 'Benguela, Angola',
  distributionHub: 'Benguela & Luanda (Distribuição Nacional)',
  socialLinks: {
    instagram: 'https://instagram.com/akoyasal',
    linkedin: 'https://linkedin.com/company/akoyagrupo',
    facebook: 'https://facebook.com/akoyasal.ao'
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'novo-sal-grosso-frasco-250g',
    name: 'Sal Grosso em Frasco de Vidro com Selo',
    subtitle: 'Edição Premium para Mesa & Grelhados',
    weight: '250 g',
    category: 'launch',
    categoryLabel: 'Novo Lançamento ⭐',
    badge: 'Lançamento Oficial',
    isLaunch: true,
    launchPriceAOA: 1950,
    launchPriceUSD: 2.25,
    priceNote: 'Preço Especial de Lançamento',
    shortCopy: 'Frasco de vidro requintado com tampa azul marinho e selo de garantia Akoya. Cristais marítimos puros e ricos em minerais essenciais.',
    fullCopy: 'O mais recente lançamento da Akoya Sal foi desenvolvido para conferir sofisticação ao serviço de mesa e ao tempero de cortes nobres. Os cristais espessos de evaporação solar preservam a mineralidade pura do mar de Benguela, apresentados numa embalagem de vidro reutilizável com selo de inviolabilidade.',
    granulometry: 'Grossa selecionada (1.5 mm a 3.5 mm)',
    iodineContent: 'Mineralização marinha natural com enriquecimento iodado',
    recommendedUse: 'Churrascos na brasa, grelhados, peixe ao sal e apresentação gourmet.',
    angolanDishPairing: {
      dishName: 'Picanha na Brasa com Mandioca Frita',
      description: 'Polvilhe os cristais grossos 5 minutos antes de ir ao fogo para selar os sumos e caramelizar uma crosta dourada e crocante.',
      chefTip: 'Bata suavemente a carne após assar para retirar o excesso; os cristais Akoya penetram a gordura com extrema harmonia.'
    },
    packaging: 'Frasco de vidro cilíndrico de alta transparência com tampa metálica azul Akoya e selo de garantia vertical.',
    features: [
      'Novo lançamento da coleção de mesa 2026',
      '100% Sal Marinho Natural das salinas de Benguela',
      'Rico em minerais bioativos e sem branqueadores',
      'Embalagem hermética com selo de segurança exclusivo'
    ],
    image: '/assets/aistudio/IMG_20261018_201144_881_f7dc2969.jpg'
  },
  {
    id: 'novo-sal-marinho-pouch-500g',
    name: 'Sal Marinho Stand-Up Pouch com Ziploc',
    subtitle: 'Praticidade & Barreira Anti-Humidade',
    weight: '500 g',
    category: 'launch',
    categoryLabel: 'Novo Lançamento ⭐',
    badge: 'Novo Formato 500g',
    isLaunch: true,
    launchPriceAOA: 1250,
    launchPriceUSD: 1.45,
    priceNote: 'Preço de Introdução ao Mercado',
    shortCopy: 'Embalagem pouch vertical com fecho de correr hermético e janela de visualização dos cristais cristalinos.',
    fullCopy: 'Projetado para as cozinhas modernas de Angola. O novo pouch vertical de 500g da Akoya Sal protege os cristais marinhos contra a humidade costeira graças à sua tripla camada laminada com fecho hermético zip-lock, mantendo o sal sempre solto e pronto a usar.',
    granulometry: 'Média a fina polivalente',
    iodineContent: '20 - 40 mg/kg certificado pelo MINSA',
    recommendedUse: 'Cozeduras diárias, marinadas, arroz de marisco e caldos.',
    angolanDishPairing: {
      dishName: 'Arroz de Marisco com Gambas de Benguela',
      description: 'Adicione uma pitada durante a infusão do caldo de camarão para despertar os açúcares naturais dos frutos do mar.',
      chefTip: 'O fecho ziploc garante frescura mesmo nas regiões com maior taxa de humidade tropical.'
    },
    packaging: 'Stand-up pouch laminado em azul marinho e branco pérola com fecho ziploc e base reforçada.',
    features: [
      'Novo tamanho familiar de 500 gramas',
      'Fecho hermético reutilizável que dispensa transferência para potes',
      'Proteção total contra a humidade tropical',
      '100% Natural, evaporação solar limpa em Benguela'
    ],
    image: '/assets/aistudio/1792347915088_ef2f29a9.jpg'
  },
  {
    id: 'sal-fino-iodado-moinho-250g',
    name: 'Sal Fino Iodado com Moinho Integrado',
    subtitle: 'Frasco de Vidro com Moagem Cerâmica',
    weight: '250 g',
    category: 'gourmet',
    categoryLabel: 'Mesa & Restauração',
    badge: 'Top Vendas Nacional',
    isLaunch: false,
    priceNote: 'Sob Consulta Comercial',
    shortCopy: 'Moinho integrado ergonómico para dosagem no instante exato da refeição com máxima frescura e iodização garantida.',
    fullCopy: 'O clássico de prestígio da Akoya Sal. Conhecido pelos chefs dos principais restaurantes de Luanda e Benguela, o seu mecanismo de moagem ajustável permite variar entre flocos finos e cristais médios, garantindo que o iodo essencial à saúde chegue puro ao seu prato.',
    granulometry: 'Fina calibrada para moinho (0.2 mm a 0.8 mm)',
    iodineContent: '20 - 40 mg/kg (Iodeto/Iodato de Potássio)',
    recommendedUse: 'Finalização de peixes na grelha, saladas frescas e mise-en-place de restauração.',
    angolanDishPairing: {
      dishName: 'Mufete Tradicional com Peixe Galo na Brasa',
      description: 'Moa diretamente sobre o peixe acabado de retirar da brasa viva para criar uma camada estaladiça inconfundível.',
      chefTip: 'Acrescente também dois giros do moinho sobre o molho de cebola, vinagre e azeite doce.'
    },
    packaging: 'Frasco de vidro reforçado com moinho integrado cerâmico e tampa protetora transparente.',
    features: [
      'Embalagem de prestígio para mesas de jantar e buffets',
      'Mecanismo de moagem durável e recarregável',
      'Sal iodado para a prevenção activa de distúrbios da tiróide',
      'Origem garantida do litoral de Benguela'
    ],
    image: '/assets/aistudio/1792348708483_a8800b55.jpg'
  },
  {
    id: 'sal-rosa-himalaia-moinho-200g',
    name: 'Sal Rosa do Himalaia com Moinho',
    subtitle: 'Pureza Geológica 100% Natural',
    weight: '200 g',
    category: 'gourmet',
    categoryLabel: 'Edição Nobre',
    badge: '100% Natural',
    isLaunch: false,
    priceNote: 'Sob Consulta Comercial',
    shortCopy: 'Cristais rosados selecionados ricos em mais de 84 oligoelementos naturais com moinho de precisão.',
    fullCopy: 'A jóia mineral selecionada pelo Grupo Akoya. Composto por mais de 84 minerais como magnésio, potássio e ferro que conferem a sua cor rosada e sabor suave. A embalagem apresenta rótulo completo com informação nutricional, lote e código de barras oficial.',
    granulometry: 'Média a grossa para trituração instantânea',
    iodineContent: 'Composição mineral autóctone não refinada',
    recommendedUse: 'Assados festivos, costeletões de novilho, tábuas de queijos e carpaccios.',
    angolanDishPairing: {
      dishName: 'Churrasco Nobre de Novilho com Farofa de Banana',
      description: 'Realça a doçura natural da carne maturada sem a agressividade do sal clorado convencional.',
      chefTip: 'Utilize o moinho ajustado para moagem média logo após selar a carne na grelha.'
    },
    packaging: 'Frasco de vidro transparente com rótulo azul nobre, moinho superior e tabela nutricional no verso.',
    features: [
      '84+ oligoelementos naturais biodisponíveis',
      'Sabor delicado e menor teor relativo de sódio puro',
      'Moinho regulável de alta precisão',
      'Rastreabilidade total e lote marcado no verso'
    ],
    image: '/assets/aistudio/1792348717232_07a92de3.jpg'
  },
  {
    id: 'sal-grosso-pouch-1kg',
    name: 'Sal Grosso Stand-Up Pouch (1 kg)',
    subtitle: 'Formato Familiar & Churrasco Tradicional',
    weight: '1 kg',
    category: 'retail',
    categoryLabel: 'Familiar & Grelhados',
    badge: 'Formato Económico 1kg',
    isLaunch: false,
    priceNote: 'Sob Consulta / Distribuição',
    shortCopy: 'Embalagem resistente de 1 kg com cristais grossos de evaporação solar para grandes cozinhados e assadores.',
    fullCopy: 'O companheiro indispensável do fim de semana angolano e dos mestres assadores. O saco de 1 kg oferece o melhor custo-benefício para famílias e churrascadas, combinando cristais grossos de dissolução lenta com a pureza inigualável do mar de Benguela.',
    granulometry: 'Grossa tradicional (2.0 mm a 4.0 mm)',
    iodineContent: 'Enriquecimento iodado em conformidade com o MINSA',
    recommendedUse: 'Churrasco angolano, salga de peixe fresco, feijoadas e caldeiradas de marisco.',
    angolanDishPairing: {
      dishName: 'Churrasco Misto com Cabrito e Chouriço Caseiro',
      description: 'Cristais grossos perfeitos para massajar as peças de cabrito com alho e louro antes de assar lentamente na brasa.',
      chefTip: 'Salpique o sal grosso 15 minutos antes da grelha para abrir os poros da carne.'
    },
    packaging: 'Pouch de alta gramagem com vedação térmica e acabamento mate acetinado.',
    features: [
      'Embalagem de 1 kg de alta durabilidade',
      'Ideal para assadores profissionais e consumo familiar alargado',
      'Cristais marinhos puros colhidos nas salinas solares',
      'Excelente margem de rotação para supermercados e armazéns'
    ],
    image: '/assets/aistudio/IMG_20261018_200932_255_79396934.jpg'
  },
  {
    id: 'sal-fino-iodado-saqueta-250g',
    name: 'Sal Fino Iodado em Saqueta (250 g)',
    subtitle: 'O Essencial dos Lares Angolanos',
    weight: '250 g',
    category: 'retail',
    categoryLabel: 'Consumo Diário',
    badge: 'Essencial Diário',
    isLaunch: false,
    priceNote: 'Sob Consulta / Grande Retalho',
    shortCopy: 'A saqueta de sal fino iodado mais prática da despensa angolana, com granulometria ultra fluida e rápida dissolução.',
    fullCopy: 'Desenvolvido para atender o dia a dia de todas as cozinhas de Angola. A saqueta laminada da Akoya protege o sal marinho contra o empedramento, garantindo um sal solto, perfeitamente iodizado e de sabor limpo para caldos, ensopados e refogados.',
    granulometry: 'Fina regular (0.2 mm a 0.5 mm)',
    iodineContent: '20 - 40 mg/kg garantidos pelo MINSA',
    recommendedUse: 'Calulu de peixe, funge de milho, sopas, feijão com óleo de palma e estufados.',
    angolanDishPairing: {
      dishName: 'Calulu de Peixe Tradicional com Quiabos',
      description: 'Dissolve-se harmoniosamente no molho espesso de quiabo e folhas verdes sem alterar a tonalidade do prato.',
      chefTip: 'Adicione no final da refoga para manter o equilíbrio com o peixe seco previamente demolhado.'
    },
    packaging: 'Saqueta laminada hermética de 250g em azul marinho e branco com selos de iodização.',
    features: [
      'Produto de primeira necessidade acessível a toda a população',
      'Iodização rigorosamente controlada para prevenir o bócio',
      'Embalagem compacta de fácil arrumação na despensa',
      'Fornecido em caixas master para distribuição retalhista'
    ],
    image: '/assets/aistudio/IMG_20261018_201156_185_ee56bd1b.jpg'
  },
  {
    id: 'sal-iodizado-grosso-saco-25kg',
    name: 'Sal Iodizado Grosso Benguela (Saco 25 kg)',
    subtitle: 'Abastecimento B2B & Grande Indústria',
    weight: '25 kg',
    category: 'industrial',
    categoryLabel: 'Grossistas & HORECA',
    badge: 'Abastecimento em Escala',
    isLaunch: false,
    priceNote: 'Cotação por Palete / Camião',
    shortCopy: 'Saco industrial de 25 kg de alta resistência sobre palete para padarias, indústrias alimentares e hotelaria.',
    fullCopy: 'A solução industrial do Grupo Akoya com capacidade de entrega nacional a partir das salinas de Benguela. Desenvolvido para utilizadores profissionais com teor controlado de humidade, pureza química acima de 99.4% e certificado laboratorial emitido por lote.',
    granulometry: 'Grossa industrial homogénea',
    iodineContent: '25 - 45 mg/kg garantidos com doseamento mecânico',
    recommendedUse: 'Panificação em larga escala, transformação de pescado, conservas e cozinhas industriais.',
    angolanDishPairing: {
      dishName: 'Produção Industrial de Pão de Benguela & HORECA',
      description: 'Confere elasticidade superior às massas fermentadas de padaria e rendimento superior.',
      chefTip: 'Oferece um rendimento 12% superior por saco devido ao processo de secagem solar mecânica intensiva.'
    },
    packaging: 'Saco de ráfia de polipropileno reforçado com identificação clara, data de fabrico e lote.',
    features: [
      'Embalagem homologada para transporte de longa distância nas 18 províncias',
      'Fornecimento programado com contratos mensais ou semestrais',
      'Descontos escalonados por tonelada e camião completo',
      'Ficha técnica e relatório de conformidade sanitária em cada entrega'
    ],
    image: '/assets/aistudio/IMG_20261018_200550_819_44a9e455.jpg'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Captação & Evaporação Solar',
    subtitle: 'A Pureza do Litoral de Benguela',
    description: 'A água límpida do Oceano Atlântico é captada para tanques rasos (cristalizadores), onde a conjugação natural do sol ardente de Benguela e o vento costeiro concentram a salmoura com paciência orgânica.',
    keyBenefit: 'Processo 100% natural, sem recurso a combustíveis fósseis ou aditivos químicos.',
    image: '/assets/aistudio/Salinas_BGB_315f5f95.jpeg',
    technicalSpec: 'Densidade salina de 35 a 260 g/L por evaporação solar limpa.',
    location: 'Salinas BGB · Benguela, Angola'
  },
  {
    stepNumber: '02',
    title: 'Cristalização & Colheita Artesanal',
    subtitle: 'Nascimento dos Cristais Puros',
    description: 'À medida que a densidade mineral atinge o ponto ideal, o sal cristaliza no fundo dos tanques formando pirâmides brancas que são recolhidas cuidadosamente em montes e montanhas de sal marinho puro.',
    keyBenefit: 'Preservação da estrutura mineral nativa do mar angolano.',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.26_60bba5de.jpeg',
    technicalSpec: 'Cristalização fracionada natural com teor de NaCl superior a 99.4%.',
    location: 'Bacias Cristalizadoras Costeiras · Benguela'
  },
  {
    stepNumber: '03',
    title: 'Refinação & Iodização Mecanizada',
    subtitle: 'Tecnologia & Saúde Pública',
    description: 'Na unidade industrial em Benguela, o sal passa por processos automatizados de lavagem com salmoura purificada, secadores rotativos e iodização rigorosa com doseadores em aço inoxidável certificados pelo MINSA.',
    keyBenefit: 'Conformidade estrita com as directrizes do Ministério da Saúde de Angola (MINSA).',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.29_17d181c0.jpeg',
    technicalSpec: 'Doseamento contínuo de iodato de potássio na faixa de 20 a 40 ppm.',
    location: 'Linha de Refinação Mecânica · Unidade Fabril Benguela'
  },
  {
    stepNumber: '04',
    title: 'Embalagem & Controlo de Rastreabilidade',
    subtitle: 'Garantia do Mar ao Saleiro',
    description: 'Desde os sacos industriais de 25 kg às embalagens de mesa com moinho e pouches herméticos, cada produto é ensacado em ambiente controlado com código de lote, data e certificado laboratorial.',
    keyBenefit: 'Rastreabilidade 100% verificável do produtor ao consumidor final.',
    image: '/assets/aistudio/file_00000000ec6081f4a9954dda89425804_8de21a4f.png',
    technicalSpec: 'Silos verticais, balanças eletrónicas de precisão e ensaque automático.',
    location: 'Pavilhão de Ensaque & Expedição · Grupo Akoya'
  }
];

export const FACILITY_GALLERY: FacilityPhoto[] = [
  {
    id: 'salinas-bgb-piramides',
    title: 'Salinas BGB de Benguela',
    subtitle: 'Geometria de Pirâmides de Sal ao Sol Atlântico',
    category: 'salinas',
    categoryLabel: 'Salinas & Colheita Solar',
    badge: 'Colheita Solar Natural',
    image: '/assets/aistudio/Salinas_BGB_315f5f95.jpeg',
    description: 'Fotografia real das Salinas BGB em Benguela. O reflexo nas águas das bacias cristalizadoras mostra centenas de pirâmides de sal colhidas após meses de evaporação solar pura sob o sol costeiro.',
    hotspots: [
      { x: 38, y: 64, title: 'Pirâmides de Cristalização', detail: 'Formadas por sedimentação natural de cloreto de sódio em contacto com o vento atlântico.' },
      { x: 74, y: 55, title: 'Bacias Cristalizadoras', detail: 'Tanques rasos forrados para assegurar água marinha pura e evitar contacto com impurezas térreas.' },
      { x: 50, y: 15, title: 'Insolação Costeira de Benguela', detail: 'Mais de 300 dias anuais de radiação solar direta para uma secagem 100% ecológica.' }
    ],
    technicalMetrics: [
      { label: 'Pureza NaCl', value: '> 99.4%' },
      { label: 'Processo', value: '100% Solar' },
      { label: 'Localização', value: 'Salinas BGB, Benguela' }
    ]
  },
  {
    id: 'pureza-cristal-mao',
    title: 'Pureza Cúbica na Palma da Mão',
    subtitle: 'Cristais Puros e Brilhantes Diretos do Saco Akoya 25 kg',
    category: 'pureza',
    categoryLabel: 'Inspeção de Pureza',
    badge: 'Cristal 100% Natural',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.28_9732d849.jpeg',
    description: 'Fotografia macro de grãos de Akoya Sal recolhidos diretamente do saco de ráfia industrial. Cristais secos, sem resíduos terrosos, com granulometria nobre e brilho límpido.',
    hotspots: [
      { x: 42, y: 52, title: 'Cristais Cúbicos Brancos', detail: 'Brancura mineral nativa obtida sem branqueadores químicos ou tratamentos agressivos.' },
      { x: 72, y: 76, title: 'Saco de Ráfia Akoya', detail: 'Embalagem de 25 kg com trama de polipropileno de alta resistência contra humidade.' }
    ],
    technicalMetrics: [
      { label: 'Cor / Aspeto', value: 'Branco Pérola Puro' },
      { label: 'Humidade Residual', value: '< 0.35%' },
      { label: 'Insolúveis em Água', value: '< 0.05%' }
    ]
  },
  {
    id: 'parque-fabril-silos',
    title: 'Pavilhão Fabril & Silos Verticais',
    subtitle: 'Capacidade Industrial Instalada em Benguela',
    category: 'fabrica',
    categoryLabel: 'Parque Fabril & Ensaque',
    badge: 'Indústria 100% Angolana',
    image: '/assets/aistudio/file_00000000ec6081f4a9954dda89425804_8de21a4f.png',
    description: 'Instalações centrais de processamento e ensaque do Grupo Akoya em Benguela. Infraestrutura moderna com piso higienizado, silos de alimentação contínua e linhas mecanizadas para abastecimento nacional.',
    hotspots: [
      { x: 18, y: 28, title: 'Silos Verticais de Alimentação', detail: 'Armazenamento estéril de sal antes do doseamento e embalamento.' },
      { x: 62, y: 56, title: 'Linha Mecanizada de Ensaque', detail: 'Pesagem eletrónica de alta precisão calibrada para sacos de 25 kg.' },
      { x: 45, y: 68, title: 'Paletes Prontas para Expedição', detail: 'Sacos empilhados sobre paletes com identificação de lote para transporte nacional.' }
    ],
    technicalMetrics: [
      { label: 'Capacidade Mensal', value: '+5.000 Toneladas' },
      { label: 'Ensaque', value: 'Pesagem Eletrónica' },
      { label: 'Padrão Higiénico', value: 'Norma Sanitária MINSA' }
    ]
  },
  {
    id: 'linha-refinacao-iodizacao',
    title: 'Linha de Refinação & Tanque de Iodização',
    subtitle: 'Tecnologia em Aço Inoxidável Certificada',
    category: 'fabrica',
    categoryLabel: 'Parque Fabril & Ensaque',
    badge: 'Certificação MINSA',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.29_17d181c0.jpeg',
    description: 'Maquinaria de processamento em aço inox 316L com doseadores automáticos para injeção de iodo certificado pelo Ministério da Saúde de Angola, garantindo proteção contra o bócio e carências nutricionais.',
    hotspots: [
      { x: 82, y: 62, title: 'Tanque Inox de Iodização', detail: 'Doseamento micrométrico contínuo de iodato de potássio segundo a legislação angolana.' },
      { x: 55, y: 46, title: 'Secador Rotativo & Elevadores', detail: 'Remoção contínua de água livre mantendo a granulometria intacta.' }
    ],
    technicalMetrics: [
      { label: 'Teor de Iodo', value: '20 - 40 mg/kg' },
      { label: 'Material de Contacto', value: 'Aço Inox 316L' },
      { label: 'Controlo', value: 'Automação Contínua' }
    ]
  },
  {
    id: 'montanha-sal-colheita',
    title: 'Grande Reserva de Sal Marinho Solar',
    subtitle: 'Montanhas de Cristais Puros sob o Céu de Benguela',
    category: 'salinas',
    categoryLabel: 'Salinas & Colheita Solar',
    badge: 'Reserva Estratégica',
    image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_16.45.26_60bba5de.jpeg',
    description: 'Vista monumental da reserva de sal marinho nas salinas de Benguela. Milhares de toneladas de sal natural em reserva contínua, assegurando que nunca falte sal à indústria alimentar, panificação e supermercados de Angola.',
    hotspots: [
      { x: 45, y: 60, title: 'Montanha de Sal Puro', detail: 'Reserva estratégica para manter fornecimento constante em todas as estações do ano.' },
      { x: 75, y: 48, title: 'Canais de Água Marinha', detail: 'Circulação controlada de água do oceano para os tanques de cristalização.' }
    ],
    technicalMetrics: [
      { label: 'Stock Permanente', value: 'Milhares de Toneladas' },
      { label: 'Impacto Ambiental', value: 'Zero Emissões Carbono' },
      { label: 'Origem', value: '100% Mar de Benguela' }
    ]
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'mufete-benguelense',
    title: 'Mufete Tradicional de Benguela',
    subtitle: 'Peixe na Brasa com Cristais de Sal Marinho',
    prepTime: '45 minutos',
    difficulty: 'Fácil',
    recommendedSalt: 'Sal Fino Iodado Akoya com Moinho',
    saltProductId: 'sal-fino-iodado-moinho-250g',
    story: 'O prato que define a alma da costa angolana. Peixe fresco galo ou cacusso grelhado na brasa viva de carvão vegetal, servido com feijão de óleo de palma, mandioca, batata-doce e o inconfundível molho de cebola picada.',
    ingredients: [
      '2 Peixes Galo ou Cacusso frescos (aprox. 1.2 kg)',
      '3 giros generosos de Sal Fino Iodado Akoya',
      '4 colheres de sopa de azeite doce de qualidade',
      'Sumo de 2 limões frescos',
      '3 dentes de alho esmagados',
      'Para o molho: 2 cebolas médias picadinhas, 1 piripiri verde, vinagre, azeite e 1 pitada de Sal Akoya',
      'Acompanhamentos: Feijão de óleo de palma com farinha de mandioca torrada, batata-doce cozida e banana-pão'
    ],
    instructions: [
      'Dê três golpes diagonais suaves em cada lado do peixe fresco limpo.',
      'Moa o Sal Akoya diretamente sobre o peixe com o moinho, combinando com o alho e o sumo de limão 20 minutos antes de ir à grelha.',
      'Coloque na grelha bem quente sobre brasas suaves, virando apenas uma vez para selar os sucos suculentos.',
      'Prepare o molho de cebola crua temperada com o vinagre, azeite e mais uma pitada sutil de Sal Akoya moído.',
      'Sirva fumegante com o feijão de óleo de palma aveludado e a mandioca macia.'
    ],
    chefTip: 'O Sal Akoya moído no momento cria uma barreira crocante e não resseca as fibras delicadas do peixe.',
    image: '/src/assets/images/culinary_salt_sprinkle_mufete_1794236250219.jpg'
  },
  {
    id: 'calulu-peixe-angolano',
    title: 'Calulu de Peixe de Luanda & Benguela',
    subtitle: 'A harmonia ancestral de peixe fresco, peixe seco e quiabos',
    prepTime: '60 minutos',
    difficulty: 'Médio',
    recommendedSalt: 'Sal Fino Iodado em Saqueta (250g)',
    saltProductId: 'sal-fino-iodado-saqueta-250g',
    story: 'O Calulu é mais do que um prato: é o património dos almoços de família de domingo em Angola. A união entre o peixe seco e o peixe fresco exige um sal refinado de alta pureza para equilibrar os sabores sem sobrecarregar o salitre do mar.',
    ingredients: [
      '600g de Corvina fresca em postas',
      '300g de Peixe seco tradicional (previamente demolhado)',
      '1 colher de chá de Sal Fino Iodado Akoya',
      '300g de quiabos tenros cortados ao meio',
      '2 molhos de ramas de batata-doce (ou folhas de espinafre/gimboa)',
      '3 tomates maduros picados e 1 cebola grande',
      '3 dentes de alho e 1 folha de louro',
      '4 colheres de sopa de óleo de palma virgem'
    ],
    instructions: [
      'Tempere o peixe fresco com o Sal Fino Iodado Akoya, alho e limão.',
      'Numa panela de fundo grosso, disponha camadas alternadas de rama verde, cebola, tomate, quiabos, peixe fresco e peixe seco.',
      'Regue com o óleo de palma aquecido e tape a panela em lume brando sem adicionar água, deixando as folhas libertarem a sua humidade natural.',
      'Cozinhe por 35 minutos até os quiabos ficarem macios e o molho denso e aromático.',
      'Ajuste o sal com uma pitada suave de Akoya se necessário e sirva com funge de milho ou de bombó fumegante.'
    ],
    chefTip: 'Como o peixe seco já contém teor de salitre, o Sal Akoya na marinada do peixe fresco é a chave para o equilíbrio harmónico.',
    image: '/src/assets/images/recipe_calulu_angolano_1794236251260.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Chef Maria Kianda',
    role: 'Chef Executiva de Cozinha',
    organization: 'Restaurante Terraço Atlântico (Luanda)',
    location: 'Luanda, Ilha do Cabo',
    quote: 'Na alta gastronomia, o sal não é mero condimento: é o elemento que desperta a complexidade de cada ingrediente. O frasco com moinho da Akoya Sal e o novo Sal Grosso de mesa tornaram-se indispensáveis na nossa cozinha.',
    metrics: 'Uso diário em mais de 350 refeições gourmet/dia',
    avatarInitials: 'MK'
  },
  {
    id: 't-2',
    name: 'Eng. Domingos Van-Dúnem',
    role: 'Diretor de Aquisições & Cadeia de Abastecimento',
    organization: 'Rede de Hotéis Baía & Resorts',
    location: 'Benguela & Lobito',
    quote: 'A consistência do saco de 25 kg e a pontualidade nas entregas resolveram um gargalo crónico que tínhamos com fornecedores importados. A Akoya entrega qualidade internacional com orgulho e preço nacional.',
    metrics: 'Redução de 22% nos custos operacionais com sal industrial',
    avatarInitials: 'DV'
  },
  {
    id: 't-3',
    name: 'Teresa Cabral',
    role: 'Gerente Comercial de Categoria Alimentar',
    organization: 'Supermercados & Distribuição Kwanza Sul',
    location: 'Sumbe & Benguela',
    quote: 'A aceitação nas prateleiras foi imediata. A apresentação moderna da saqueta, o novo pouch de 500g e os frascos com moinho chamam a atenção do consumidor angolano que procura produtos nacionais com padrão premium.',
    metrics: '+45% de rotação de stock no primeiro trimestre',
    avatarInitials: 'TC'
  }
];

export const BRAND_STORY = {
  pearlMetaphor: 'Porquê AKOYA? Na tradição universal dos mares, a pérola Akoya é famosa por ser a mais luminosa, esférica e pura pérola oceânica cultivada. Da mesma forma, o AKOYA SAL nasce no litoral privilegiado de Benguela como uma verdadeira pérola mineral: 100% natural, sem químicos industriais e cristalizado pela generosidade do sol e do mar angolano.',
  benguelaHeritage: 'Benguela é abençoada com águas atlânticas cristalinas e um dos regimes de insolação e vento mais estáveis do continente africano. Aliamos essa herança natural a uma moderna infraestrutura fabril mecânica para assegurar que cada família angolana tenha acesso a um sal nutritivo, seguro e digno.',
  nationalPride: 'Comprar AKOYA SAL é investir na autossuficiência de Angola, valorizar o emprego nacional em Benguela e levar para a sua mesa um produto concebido e embalado segundo as mais estritas directrizes mundiais de segurança alimentar.'
};

export const B2B_CHANNELS = [
  {
    id: 'horeca',
    title: 'Hotelaria & Restauração (HORECA)',
    description: 'Frascos premium para sala de refeições e sacos industriais para cozinhas profissionais com faturas e fornecimento programado.',
    recommendedFormat: 'Sacos 25 kg + Frascos Moinho 250g'
  },
  {
    id: 'retail',
    title: 'Supermercados & Grandes Superfícies',
    description: 'Gama de 250g, 500g e 1kg pronta para linear, com código de barras GS1, caixas master compactas e suporte comercial.',
    recommendedFormat: 'Caixas de 24 / 48 unidades com expositor'
  },
  {
    id: 'industry',
    title: 'Indústria Alimentar & Panificação',
    description: 'Sal com teor de humidade controlado (<0.5%) e doseamento exacto de iodo para padarias, conservas e embutidos industriais.',
    recommendedFormat: 'Paletes completas (1 a 10 toneladas)'
  },
  {
    id: 'wholesale',
    title: 'Distribuidores & Grossistas Provinciais',
    description: 'Condições de pagamento escalonadas, exclusividade territorial por província e suporte de marketing nos pontos de venda.',
    recommendedFormat: 'Camião fechado (25 a 30 toneladas)'
  }
];

export const PROVINCES_OF_ANGOLA = [
  'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 
  'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 
  'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'
];
