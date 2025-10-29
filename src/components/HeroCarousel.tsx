import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Magical Party Experiences',
    subtitle: 'Transform your celebration with our premium party equipment and themed decorations',
    image: '',
    cta: 'Explore Themes',
  },
  {
    id: 2,
    title: 'Disney Dreams Come True',
    subtitle: 'Bring the magic of Disney to your party with our exclusive themed collections',
    image: '',
    cta: 'View Disney Collection',
  },
  {
    id: 3,
    title: 'Superhero Adventures',
    subtitle: 'Power up your party with our action-packed superhero themes and decorations',
    image: '',
    cta: 'Discover Heroes',
  },
  {
    id: 4,
    title: 'Retro 80s Party Vibes',
    subtitle: 'Take a trip back in time with our totally rad 80s themed party equipment',
    image: '',
    cta: 'Go Retro',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying && !isPaused) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [isPlaying, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (isPlaying) {
      startTimer();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (isPlaying) {
      startTimer();
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    if (isPlaying) {
      startTimer();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-muted"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
      aria-live="polite"
      role="region"
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            /> */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {slide.title}
                  </h1>
                  <p className="mb-8 text-lg md:text-xl text-white/90">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[--brand-orange] to-[--brand-pink] hover:opacity-90 text-white"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-20 right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
}
