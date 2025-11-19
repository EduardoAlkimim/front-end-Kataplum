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
import { MakeParty } from './components/MakeParty'; 
import { Toaster } from './components/ui/sonner';

// 🚀 NOVO: IMPORTAR O COMPONENTE DE PÁGINA DE DETALHES
import { ProductDetailPage } from './components/ProductDetailPage'; 

import './index.css';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <main>
            <Routes>
              {/* Rota Home */}
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

              {/* Rota Catálogo Completo */}
              <Route
                path="/produtos"
                element={<AllProducts />}
              />

              {/* Rota Assistente de Festa */}
              <Route
                path="/montar-festa"
                element={<MakeParty />}
              />
              
              {/* 🚀 NOVA ROTA DINÂMICA DE DETALHES */}
              <Route
                path="/produto/:id" // <-- Esta rota pega o ID do produto
                element={<ProductDetailPage />}
              />

              {/* Rota de Teste (mantida) */}
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