import { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface InstagramPost {
  id: string;
  image: string; // URL da imagem
  caption: string; // Legenda
  link: string; // Link direto para o post
}

const mockPosts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763390878/kataplum__572125495_18346173280201149_4322261797416843988_n_bzthst.jpg',
    caption: 'Festa mágica de aniversário! Nossos temas da Disney fazem a diferença. 🎈',
    link: 'https://www.instagram.com/p/DQZaGwbEZ_u/?img_index=1',
  },
  {
    id: '2',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763390946/kataplum__581844369_18348854440201149_2194126272370560848_n_xnr30h.jpg',
    caption: 'Perfeição em cada detalhe na festa com tema Disney. ✨',
    link: 'https://www.instagram.com/p/DQ7MRh2EQG6/',
  },
  {
    id: '3',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763391005/kataplum__557784546_18341420623201149_3472441648000830240_n_1_iktvbw.jpg',
    caption: 'Vibes de festa de Super-Heróis! 💥 Decoração cheia de ação.',
    link: 'https://www.instagram.com/p/DPPAIA8kYcK/?img_index=1',
  },
  {
    id: '4',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763391095/kataplum__549288486_18339290566201149_1935438175916380189_n_1_mssdvv.jpg',
    caption: 'Montagem de festa Retrô Anos 80. 🎸',
    link: 'https://www.instagram.com/p/DOoi_qZkaSn/?img_index=1',
  },
  {
    id: '5',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763391134/kataplum__536461638_18336450715201149_8128367329574983868_n_1_pzkjcp.jpg',
    caption: 'Uma linda mesa de festa. 🎂',
    link: 'https://www.instagram.com/p/DNqyL60Ry2W/?img_index=1',
  },
  {
    id: '6',
    image: 'https://res.cloudinary.com/dsry3r1jc/image/upload/v1763391186/kataplum__532689484_18335422549201149_4746098634310949878_n_ksmieh.jpg',
    caption: 'Jogos divertidos para as crianças! 🎮',
    link: 'https://www.instagram.com/p/DNTfVRvPTPz/?img_index=1',
  },
];

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [, setIsLoading] = useState(true); // Começa true
  const [isOffline, setIsOffline] = useState(false);

  const apiEndpoint = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_IG_ENDPOINT) || '';

  useEffect(() => {
    fetchInstagramPosts();

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchInstagramPosts = async () => {
    if (!apiEndpoint) {
      setPosts(mockPosts);
      setIsLoading(false);
      return;
    }
    // ... (Sua lógica de cache) ...
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100" id="instagram">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            {/* 👇 ERRO CORRIGIDO: <h2> fechado corretamente 👇 */}
            <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Siga nossas <span className="text-[#E91E63]">Histórias</span>
            </h2>
            <p className="text-lg text-gray-500">
              Veja os bastidores e festas reais no nosso Instagram.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {/* 👇 BOTÃO DE ATUALIZAR REMOVIDO 👇 */}
            
            <Button
              asChild
              variant="kataplumOutline" // Usando a variante Rosa Pastel
              size="lg"
              className="rounded-full"
            >
              <a
                href="https://instagram.com/kataplum_" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
                <span>Siga-nos</span>
              </a>
            </Button>
          </div>
        </div>

        {isOffline && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700">
              Você está offline. Mostrando conteúdo salvo no cache.
            </p>
          </div>
        )}

        {/* Removi o "lastFetch" para um visual mais limpo */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
            >
              <img
                src={post.image || 'https://placehold.co/500x500?text=Sem+Imagem'}
                alt={post.caption} // Legenda ainda usada para acessibilidade
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* 👇 CAMADA DE LEGENDA REMOVIDA 👇 */}
              {/* <div className="absolute inset-0 bg-gradient-to-t ...">
                  ... (código da legenda removido) ...
                </div> 
              */}
              
              {/* Ícone sutil no canto para indicar link externo */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-4 h-4 text-gray-800" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}