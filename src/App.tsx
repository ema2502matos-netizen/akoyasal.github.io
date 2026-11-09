import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { FacilityTour } from './components/FacilityTour';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { B2BSection } from './components/B2BSection';
import { RecipesAndProof } from './components/RecipesAndProof';
import { Footer } from './components/Footer';
import { BrandGuideModal } from './components/BrandGuideModal';
import { Product } from './types/akoya';
import { MessageCircle, FileText } from 'lucide-react';
import { COMPANY_INFO } from './data/akoyaData';
import { SaltParticleCanvas } from './components/SaltParticleCanvas';
import { ScrollProgressRadar } from './components/ScrollProgressRadar';
import { InteractiveCursor } from './components/InteractiveCursor';
import { GranulometryLab } from './components/GranulometryLab';
import { DishSeasoningSimulator } from './components/DishSeasoningSimulator';
import { WaveDivider } from './components/WaveDivider';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState(false);
  const [b2bPreselectedProduct, setB2bPreselectedProduct] = useState<string | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenB2BQuote = (productId?: string) => {
    if (productId) {
      setB2bPreselectedProduct(productId);
    }
    scrollToSection('b2b');
  };

  return (
    <div className="min-h-screen bg-[#F6F1EA] text-[#231B15] selection:bg-[#C5A059]/30 selection:text-[#0B192C] relative font-sans overflow-x-hidden">
      {/* Top Scroll Progress Bar & Quick Section Radar */}
      <ScrollProgressRadar />

      {/* Interactive Desktop Pearl Cursor Follower */}
      <InteractiveCursor />

      {/* Interactive ambient floating salt crystals canvas */}
      <SaltParticleCanvas density={40} interactive={true} />

      {/* Navigation */}
      <Navbar
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onOpenB2BQuote={() => handleOpenB2BQuote()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section (Ultra Dinâmico com seletor de fotos reais das instalações) */}
        <Hero
          onExploreProducts={() => scrollToSection('produtos')}
          onOpenB2BQuote={() => handleOpenB2BQuote()}
        />

        <WaveDivider fillColor="#EFE8DE" bgColor="#FAF6F0" />

        {/* 2. História & Pureza (Construção de Marca & Do Mar ao Saleiro com fotos reais) */}
        <BrandStory />

        <WaveDivider fillColor="#FAF6F0" bgColor="#EFE8DE" />

        {/* 3. Tour Dinâmico às Salinas de Benguela & Parque Fabril (Fotos reais com Hotspots & Zoom) */}
        <FacilityTour onOpenB2BQuote={() => handleOpenB2BQuote()} />

        <WaveDivider fillColor="#FAF6F0" bgColor="#FAF6F0" />

        {/* 4. Laboratório Dinâmico de Granulometria & Pureza (Microscópio, Cristais & Dissolução) */}
        <GranulometryLab />

        <WaveDivider fillColor="#F6F1EA" bgColor="#FAF6F0" />

        {/* 5. Catálogo de Produtos Dinâmico (Foco em Vendas - Preços apenas nos Lançamentos) */}
        <ProductCatalog
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenB2BQuote={(prodId) => handleOpenB2BQuote(prodId)}
        />

        <WaveDivider fillColor="#EFE8DE" bgColor="#F6F1EA" />

        {/* 6. Simulador Sensorial de Tempero AKOYA (Mufete, Calulu, Choco, Picanha com Áudio) */}
        <DishSeasoningSimulator />

        <WaveDivider fillColor="#FAF6F0" bgColor="#EFE8DE" />

        {/* 7. B2B & Networking (Parcerias Corporativas, Simulador de Cotação de 25 kg e Paletes) */}
        <B2BSection initialProductId={b2bPreselectedProduct} />

        <WaveDivider fillColor="#F6F1EA" bgColor="#FAF6F0" />

        {/* 8. Prova Social & Receitas Angolanas (Mufete, Calulu & Depoimentos) */}
        <RecipesAndProof />
      </main>

      {/* 7. Rodapé Institucional & Contactos Oficiais */}
      <Footer
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onOpenB2BQuote={() => handleOpenB2BQuote()}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenB2BQuote={(prodId) => handleOpenB2BQuote(prodId)}
      />

      {/* Brand Guide & No-Code / Copywriting Modal */}
      <BrandGuideModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
      />

      {/* Persistent Floating WhatsApp Action for Quick Inquiries */}
      <aside aria-label="Acesso rápido WhatsApp" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsBrandGuideOpen(true)}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1F1914] bg-[#EDE4D8]/95 hover:bg-[#E3D6C5] border border-[#D8C7B4] rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#B88939]" />
          <span>Ver Dossiê de Copy</span>
        </button>

        <a
          href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Olá Akoya Sal! Gostaria de falar com o departamento comercial sobre os vossos produtos de Benguela.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#071324] font-bold text-xs rounded-full shadow-2xl transition-transform hover:scale-105"
          aria-label="Falar pelo WhatsApp Comercial"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">WhatsApp Comercial</span>
        </a>
      </aside>
    </div>
  );
}

export default App;
