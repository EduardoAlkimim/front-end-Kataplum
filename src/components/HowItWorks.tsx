import { Search, Calendar, Truck } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Busque e Selecione',
    description: 'Explore nosso catálogo e escolha seu tema de festa preferido.',
    icon: Search,
    hoverColor: 'group-hover:text-blue-600', // Azul (Busca)
  },
  {
    id: '02',
    title: 'Agende sua data',
    description: 'Reserve seus itens para a data do evento de forma simples.',
    icon: Calendar,
    hoverColor: 'group-hover:text-orange-500', // Laranja (Tempo)
  },
  {
    id: '03',
    title: 'Entregamos tudo',
    description: 'Nós entregamos e retiramos. Foque apenas em se divertir.',
    icon: Truck,
    hoverColor: 'group-hover:text-green-600', // Verde (Entrega)
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white border-b border-gray-100" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          {/* 👇 TÍTULO ESTILIZADO AQUI 👇 */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Como <span className="text-orange-500">Funciona</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Sem complicação. Tudo pronto em 3 passos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            
            return (
              <div 
                key={step.id} 
                className="
                  group relative p-8 rounded-2xl 
                  border border-gray-100 bg-white 
                  hover:border-gray-200 hover:shadow-lg 
                  transition-all duration-300 cursor-default
                "
              >
                {/* Número no fundo (visível) */}
                <div className="absolute top-4 right-6 text-6xl font-bold text-gray-300 select-none transition-colors">
                  {step.id}
                </div>

                <div className="relative z-10 flex flex-col items-start">
                  {/* Ícone (Cinza -> Cor no Hover) */}
                  <div className={`mb-6 p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 ${step.hoverColor} transition-colors duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}