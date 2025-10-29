import { Search, Calendar, Truck } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Busque e Selecione',
    description: 'Explore nosso extensivo catálogo e esdcolha seu tema de festa e equipamento preferidos.',
    icon: Search,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Agende sua data',
    description: 'Reserve seus itens para a data do evento de forma simples e online',
    icon: Calendar,
    color: 'yellow',
  },
  {
    id: 3,
    title: 'Entregamos e Preparamos',
    description: 'Entrgamos e preparamos tudo, apenas foque em se divertir e aproveite a celebração.',
    icon: Truck,
    color: 'green',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Como funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            3 simples passos para a festa perfeita
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-[--brand-pink] flex items-center justify-center shadow-lg">
                      <Icon className="w-10 h-10 text-[--brand-pink]" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[--brand-orange] text-white flex items-center justify-center shadow-md" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (Desktop Only) */}
                {!isLast && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[--brand-pink] to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-[--brand-blue] to-[--brand-green] hover:opacity-90 text-white rounded-lg transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
