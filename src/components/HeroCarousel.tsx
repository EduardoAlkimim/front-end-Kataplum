import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- DADOS DE SEGURANÇA (Fallback) ---
const DEFAULT_SLIDES = [
  {
    id: 1,
    title: 'Magical Party Experiences',
    subtitle: 'Transform your celebration with our premium party equipment.',
    image: 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=1920',
    cta: 'Explore Themes',
    link: '/front-end-Kataplum/produtos'
  },
  {
    id: 2,
    title: 'Disney Dreams Come True',
    subtitle: 'Bring the magic of Disney to your party.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1920',
    cta: 'View Collection',
    link: '/front-end-Kataplum/produtos'
  }
];

interface ProductAPI {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  imagem_url: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // --- Busca API ---
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log("🔄 Buscando banner (Top 5)...");
        
        // 1. ALTERAÇÃO AQUI: Pedindo 5 itens na URL
        const res = await axios.get(`${apiUrl}/produtos?limite=5&pagina=1`);
        const dados = res.data;

        let listaEncontrada: ProductAPI[] = [];

        // Detector de Lista (Lógica Sherlock Holmes mantida)
        if (Array.isArray(dados)) {
          listaEncontrada = dados;
        } else if (typeof dados === 'object' && dados !== null) {
          if (Array.isArray(dados.itens)) listaEncontrada = dados.itens;
          else if (Array.isArray(dados.items)) listaEncontrada = dados.items;
          else if (Array.isArray(dados.data)) listaEncontrada = dados.data;
          else if (Array.isArray(dados.products)) listaEncontrada = dados.products;
          else if (Array.isArray(dados.content)) listaEncontrada = dados.content;
          else {
            const chaves = Object.keys(dados);
            for (const chave of chaves) {
              if (Array.isArray(dados[chave])) {
                listaEncontrada = dados[chave];
                break;
              }
            }
          }
        }

        if (listaEncontrada.length === 0) return;

        // 2. ALTERAÇÃO AQUI: .slice(0, 5) garante o limite no frontend também
        const novosSlides: Slide[] = listaEncontrada.slice(0, 5).map((p) => ({
          id: p.id,
          title: p.nome,
          subtitle: p.descricao || `Oferta especial: ${p.nome}`,
          image: (p.imagem_url && p.imagem_url.length > 10) ? p.imagem_url : DEFAULT_SLIDES[0].image,
          cta: 'Ver Agora',
          link: '/front-end-Kataplum/produtos'
        }));

        setSlides(novosSlides);

      } catch (err) {
        console.error('❌ Erro na API (Mantendo slides padrão):', err);
      }
    };

    fetchSlides();
  }, []);

  // --- Timer Logic ---
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying && !isPaused && slides.length > 0) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPlaying, isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (isPlaying) startTimer();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (isPlaying) startTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    if (isPlaying) startTimer();
  };

  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-muted group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_SLIDES[0].image;
                e.currentTarget.onerror = null; 
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white animate-in slide-in-from-left-10 fade-in duration-700">
                  <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="mb-8 text-lg md:text-xl text-white/90 drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                  
                  {/* 3. ALTERAÇÃO AQUI: BOTÃO COM COR ESTÁTICA #F59E0B 
                      Usei 'bg-[#F59E0B]' para a cor exata e removi os gradients.
                  */}
                  <Button
                    size="lg"
                    className="
                      bg-[#F59E0B] hover:bg-[#d97706] hover:opacity-100
                      text-white font-bold border-0 shadow-lg
                      transform hover:scale-105 transition-all duration-300
                    "
                    asChild
                  >
                    <Link to={slide.link}>{slide.cta}</Link>
                  </Button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-4 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}