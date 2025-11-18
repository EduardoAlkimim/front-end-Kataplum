import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllProducts } from './components/AllProducts';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FeaturedCategories } from './components/FeaturedCategories';
import { HowItWorks } from './components/HowItWorks';
import { ProductList } from './components/ProductList';
import { AboutSection } from './components/AboutSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { CartProvider } from './components/CartContext';
import { MakeParty } from './components/MakeParty'; // 👈 IMPORTAÇÃO NOVA
import { Toaster } from './components/ui/sonner';

import './index.css';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroCarousel />
                    <FeaturedCategories />
                    <HowItWorks />
                    <ProductList />
                    <AboutSection />
                    <InstagramFeed />
                  </>
                }
              />

              <Route
                path="/produtos"
                element={<AllProducts />}
              />

              {/* 🚀 NOVA ROTA AQUI */}
              <Route
                path="/montar-festa"
                element={<MakeParty />}
              />

              <Route
                path="/teste"
                element={<AllProducts />}
              />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}