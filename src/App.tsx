import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FeaturedCategories } from './components/FeaturedCategories';
import { HowItWorks } from './components/HowItWorks';
import { ProductList } from './components/ProductList';
import { AboutSection } from './components/AboutSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { CartProvider } from './components/CartContext';
import { Toaster } from './components/ui/sonner';
import './index.css';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroCarousel />
          <FeaturedCategories />
          <HowItWorks />
          <ProductList />
          <AboutSection />
          <InstagramFeed />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </CartProvider>
  );
}
