import { Award, Users, Calendar, Heart } from 'lucide-react';

const stats = [
  {
    id: 1,
    value: '5000+',
    label: 'Clientes Felizes',
    icon: Users,
    color: 'blue',
  },
  {
    id: 2,
    value: '1000+',
    label: 'Eventos',
    icon: Calendar,
    color: 'orange',
  },
  {
    id: 3,
    value: '8+',
    label: 'Anos de Experiência',
    icon: Award,
    color: 'yellow',
  },
  {
    id: 4,
    value: '100%',
    label: 'Cliente Satisfeitos',
    icon: Heart,
    color: 'red',
  },
];

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-background" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="mb-6 text-3xl md:text-4xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
             Kataplum - Celebrações Inesquecíveis
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Na Kataplum, acreditamos que toda festa merece ser extraordinária. Desde 2017, ajudamos famílias e empresas a criar momentos mágicos com nossos equipamentos premium para festas e decorações temáticas. 
                Temos tudo que você precisa para dar vida à sua visão de festa.
              </p>
              <p>
                Desde celebrações encantadoras com o tema Disney até festas cheias de ação de super-heróis e reminiscências dos anos 80,
                temos tudo que você precisa para dar vida à sua visão de festa. Nosso extenso catálogo oferece aluguéis de alta qualidade, 
                serviços de configuração profissional e suporte dedicado ao cliente.
              </p>
              <p>
                O que nos diferencia é o nosso compromisso em tornar o planejamento da festa livre de estresse. Cuidamos da entrega, 
                configuração e coleta, para que você possa se concentrar no que é mais importante: 
                comemorar com seus entes queridos.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const colorMap: Record<string, string> = {
                  blue: 'text-[--brand-blue]',
                  orange: 'text-[--brand-orange]',
                  pink: 'text-[--brand-pink]',
                  green: 'text-[--brand-green]',
                };
                return (
                  <div key={stat.id} className="text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${colorMap[stat.color]}`} />
                    <div className="text-2xl md:text-3xl mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* // Imagem aqui
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687186511607-68b95444ea33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGNlbGVicmF0aW9uJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzYxNjE1OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Party celebration with colorful decorations"
                className="w-full h-full object-cover"
              />*/}
              
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[--brand-orange] rounded-full opacity-20 blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[--brand-pink] rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
