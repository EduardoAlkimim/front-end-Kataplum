import { Wand2, Zap, Music, Cake, Sparkles, Gift } from 'lucide-react';
import { Card } from './ui/card';

const categories = [
  {
    id: 1,
    name: 'Disney Magic',
    description: 'Enchanting decorations and props',
    icon: Wand2,
    color: 'blue',
    bgColor: 'bg-[#0EA5E9]/10',
    iconColor: 'text-[--brand-blue]',
  },
  {
    id: 2,
    name: 'Superhero',
    description: 'Action-packed party themes',
    icon: Zap,
    color: 'pink',
    bgColor: 'bg-[#FF1B8D]/10',
    iconColor: 'text-[--brand-pink]',
  },
  {
    id: 3,
    name: 'Retro 80s',
    description: 'Totally rad throwback vibes',
    icon: Music,
    color: 'orange',
    bgColor: 'bg-[#FF6B35]/10',
    iconColor: 'text-[--brand-orange]',
  },
  {
    id: 4,
    name: 'Birthday Bash',
    description: 'Classic celebration essentials',
    icon: Cake,
    color: 'green',
    bgColor: 'bg-[#22C55E]/10',
    iconColor: 'text-[--brand-green]',
  },
  {
    id: 5,
    name: 'Princess Party',
    description: 'Royal treatment for your little one',
    icon: Sparkles,
    color: 'pink',
    bgColor: 'bg-[#FF1B8D]/10',
    iconColor: 'text-[--brand-pink]',
  },
  {
    id: 6,
    name: 'Party Favors',
    description: 'Perfect gifts for your guests',
    icon: Gift,
    color: 'orange',
    bgColor: 'bg-[#FF6B35]/10',
    iconColor: 'text-[--brand-orange]',
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-background" id="catalog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Explore nossos temas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde momentos mágicos da Disney até aventuras de super-heróis, temos tudo que precisa para criar momentos inesquecíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden border-2 border-border hover:border-[--brand-pink] transition-all duration-300 cursor-pointer hover:shadow-lg"
              >
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className={`w-8 h-8 ${category.iconColor}`} />
                  </div>
                  <h3 className="mb-2" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-[--brand-pink] group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
