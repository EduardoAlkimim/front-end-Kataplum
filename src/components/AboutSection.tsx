import { Award, Users, Calendar, Heart } from 'lucide-react';

// Dados organizados com classes de cor diretas (pastel)
const stats = [
  {
    id: 1,
    value: '5000+',
    label: 'Clientes Felizes',
    icon: Users,
    iconColor: 'text-sky-600',
    bgColor: 'bg-sky-100',
  },
  {
    id: 2,
    value: '1000+',
    label: 'Eventos Realizados',
    icon: Calendar,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 3,
    value: '8+',
    label: 'Anos de Experiência',
    icon: Award,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 4,
    value: '100%',
    label: 'Satisfação',
    icon: Heart,
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
];

export function AboutSection() {
  return (
    <section className="py-20 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 👇 CORREÇÃO DE ALINHAMENTO: Adicionado 'lg:items-center' 👇 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
          
          {/* --- LADO ESQUERDO: TEXTO E STATS --- */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-6">
              Sobre Nós
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Kataplum: Criando <span className="text-orange-500">Celebrações Inesquecíveis</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
              <p>
                Na Kataplum, acreditamos que toda festa merece ser extraordinária. 
                Desde 2017, ajudamos famílias e empresas a transformar sonhos em realidade 
                com nossos equipamentos premium e decorações temáticas exclusivas.
              </p>
              <p>
                Nosso diferencial é tirar o estresse do seu ombro. Cuidamos de toda a logística, 
                entrega e montagem, para que sua única preocupação seja aproveitar o momento 
                com quem você ama.
              </p>
            </div>

            {/* Grid de Estatísticas (Redesenhado) */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="flex flex-col items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className={`p-3 rounded-lg ${stat.bgColor} mb-3`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- LADO DIREITO: IMAGEM --- */}
          <div className="relative">
            {/* Elementos Decorativos */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
            
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://res.cloudinary.com/dsry3r1jc/image/upload/v1763390062/kataplum__502576047_18329564113201149_7632379807681038713_n_1_gmjw8o.jpg" 
                onError={(e) => e.currentTarget.src = 'https://placehold.co/600x800/f97316/white?text=Kataplum'}
                alt="Crianças se divertindo em uma festa Kataplum com piscina de bolinhas" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}