import { Wand2, Zap, Music, Cake, Sparkles, Gift } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Ajustei a paleta para ter as cores fixas (bg/text) e as cores de interação (hover)
const COLORS = {
  blue: { 
    bg: 'bg-blue-100', text: 'text-blue-600', // Cor fixa do ícone
    hoverText: 'group-hover:text-blue-600',   // Cor do texto "Explorar" no hover
    hoverBorder: 'hover:border-blue-200'      // Cor da borda no hover
  },
  green: { 
    bg: 'bg-emerald-100', text: 'text-emerald-600', 
    hoverText: 'group-hover:text-emerald-600',
    hoverBorder: 'hover:border-emerald-200' 
  },
  orange: { 
    bg: 'bg-orange-100', text: 'text-orange-600', 
    hoverText: 'group-hover:text-orange-600',
    hoverBorder: 'hover:border-orange-200' 
  },
  pink: { 
    bg: 'bg-pink-100', text: 'text-pink-600', 
    hoverText: 'group-hover:text-pink-600',
    hoverBorder: 'hover:border-pink-200' 
  },
  purple: { 
    bg: 'bg-purple-100', text: 'text-purple-600', 
    hoverText: 'group-hover:text-purple-600',
    hoverBorder: 'hover:border-purple-200' 
  },
  yellow: { 
    bg: 'bg-yellow-100', text: 'text-yellow-600', 
    hoverText: 'group-hover:text-yellow-600',
    hoverBorder: 'hover:border-yellow-200' 
  },
};

const categories = [
  { id: 1, name: 'Magia Disney', description: 'Decorações e adereços encantadores', icon: Wand2, colorKey: 'blue' },
  { id: 2, name: 'Super-Heróis', description: 'Temas de festa cheios de ação', icon: Zap, colorKey: 'green' },
  { id: 3, name: 'Retrô Anos 80', description: 'Vibes nostálgicas e radicais', icon: Music, colorKey: 'orange' },
  { id: 4, name: 'Festa em geral', description: 'Veja todas as festas', icon: Cake, colorKey: 'pink' },
  { id: 5, name: 'Festa de Princesa', description: 'Tratamento real para sua pequena', icon: Sparkles, colorKey: 'purple' },
  { id: 6, name: 'Festas do momento', description: 'Faça a festa perfeita', icon: Gift, colorKey: 'yellow' },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-background" id="catalog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-tight">
            Explore nossos temas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde momentos mágicos da Disney até aventuras de super-heróis, temos tudo que precisa para criar momentos inesquecíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const colors = COLORS[category.colorKey as keyof typeof COLORS];
            
            return (
              <Link
                to={category.name === 'Festa em geral' ? '/produtos' : `/produtos?tag=${encodeURIComponent(category.name)}`}
                key={category.id}
              >
                <Card
                  className={`
                    group h-full p-6
                    bg-white border border-gray-100
                    ${colors.hoverBorder} 
                    hover:shadow-md
                    transition-all duration-300 ease-in-out
                    cursor-pointer rounded-xl
                  `}
                >
                  {/* Ícone (Sempre colorido agora) */}
                  <div className={`
                    w-14 h-14 rounded-full 
                    flex items-center justify-center mb-4 
                    ${colors.bg} ${colors.text}
                    transition-transform duration-300 group-hover:scale-110
                  `}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 mb-4 text-sm group-hover:text-gray-600 transition-colors">
                    {category.description}
                  </p>
                  
                  {/* Explorar (Cinza -> Cor no Hover) */}
                  <div className={`
                    flex items-center gap-2 
                    text-gray-400 font-medium text-sm
                    ${colors.hoverText} 
                    transition-colors duration-300
                  `}>
                    <span>Explorar</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}