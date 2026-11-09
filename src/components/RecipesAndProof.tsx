import React, { useState } from 'react';
import { Star, Clock, ChefHat, ArrowRight, X, Check, Sparkles } from 'lucide-react';
import { RECIPES, TESTIMONIALS } from '../data/akoyaData';
import { Recipe } from '../types/akoya';
import { TiltCard } from './TiltCard';
import { SaltSprinkleButton } from './SaltSprinkleButton';

export const RecipesAndProof: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <section id="receitas" className="py-24 bg-[#F6F1EA] relative border-t border-[#D8C7B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7236] uppercase mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Tradição & Prova de Autoridade</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1914] tracking-tight mb-4">
            A Alma da Gastronomia Angolana Temperada com AKOYA
          </h2>
          <p className="text-base text-[#5D5043] leading-relaxed">
            De Luanda a Benguela, os maiores chefs e famílias confiam na pureza cristalina do nosso sal para sublimar os sabores ancestrais da nossa terra.
          </p>
        </div>

        {/* Recipes Grid in Sand Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {RECIPES.map((recipe) => (
            <TiltCard key={recipe.id} maxTilt={5} scale={1.01} glare={true}>
              <div
                className="group rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] hover:border-[#0B192C] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
              <div className="relative h-64 overflow-hidden bg-[#EDE4D8]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1914]/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF6F0]/90 backdrop-blur-xs text-[11px] font-bold text-[#0B192C] border border-[#D8C7B4]">
                    {recipe.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#0B192C]/80 backdrop-blur-xs text-[11px] font-medium text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    {recipe.prepTime}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-[#E5C378] uppercase tracking-wider block drop-shadow-sm">
                    Sal Recomendado: {recipe.recommendedSalt}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#1F1914] group-hover:text-[#0B192C] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D5043] leading-relaxed line-clamp-2">
                    {recipe.story}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5D8C8] flex items-center justify-between">
                  <div className="text-xs text-[#4E4135]">
                    <span className="text-[#0B192C] font-bold">Segredo do Chef: </span>
                    <span className="italic">{recipe.chefTip}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <SaltSprinkleButton label="Salpicar" />
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#132845] rounded-lg transition-all cursor-pointer shadow-xs"
                    >
                      <span>Ver Receita</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </TiltCard>
          ))}
        </div>

        {/* Social Proof & Testimonials Section */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#9A7236] uppercase tracking-wider block mb-1">
              Quem Conhece Recomenda
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1F1914]">
              A Voz dos Profissionais & Clientes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D8C7B4] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#B88939]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B88939]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E4135] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5D8C8]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0B192C] flex items-center justify-center text-xs font-bold text-[#C5A059] shadow-xs">
                      {t.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F1914]">{t.name}</h4>
                      <p className="text-[11px] text-[#6C5F53]">{t.role}</p>
                      <p className="text-[10px] text-[#0B192C] font-semibold">{t.organization} · {t.location}</p>
                    </div>
                  </div>
                  {t.metrics && (
                    <div className="mt-3 pt-2 border-t border-[#E5D8C8] text-[11px] text-emerald-800 font-bold">
                      ✓ {t.metrics}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Modal in Sand */}
      {selectedRecipe && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#FAF6F0] border border-[#D8C7B4] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2D5C4] bg-[#EDE4D8]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B192C]">
                  Receita Tradicional de Angola
                </span>
                <h3 className="text-lg font-bold text-[#1F1914]">{selectedRecipe.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-1.5 text-[#5C4D3E] hover:text-[#1F1914] rounded-lg hover:bg-black/5 cursor-pointer"
                aria-label="Fechar receita"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-center gap-4 text-xs text-[#4E4135] p-3 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4]">
                <div>
                  <span className="text-[#6C5F53] block text-[10px] font-medium">Tempo:</span>
                  <span className="font-bold text-[#1F1914]">{selectedRecipe.prepTime}</span>
                </div>
                <div className="border-l border-[#D8C7B4] pl-4">
                  <span className="text-[#6C5F53] block text-[10px] font-medium">Dificuldade:</span>
                  <span className="font-bold text-[#1F1914]">{selectedRecipe.difficulty}</span>
                </div>
                <div className="border-l border-[#D8C7B4] pl-4">
                  <span className="text-[#6C5F53] block text-[10px] font-medium">Sal Indicado:</span>
                  <span className="font-bold text-[#0B192C]">{selectedRecipe.recommendedSalt}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider mb-2">
                  Ingredientes Necessários
                </h4>
                <ul className="space-y-1.5 text-xs text-[#4E4135]">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0B192C] mt-0.5 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1F1914] uppercase tracking-wider mb-2">
                  Modo de Preparação
                </h4>
                <ol className="space-y-2 text-xs text-[#4E4135]">
                  {selectedRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="font-bold text-[#0B192C] shrink-0">{i + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EDE4D8] border border-[#D8C7B4] text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="text-[#0B192C] font-bold block mb-0.5">Toque de Mestre Akoya Sal:</span>
                  <p className="text-[#5C4D3E] italic">{selectedRecipe.chefTip}</p>
                </div>
                <SaltSprinkleButton label="Salpicar no Prato" className="shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
