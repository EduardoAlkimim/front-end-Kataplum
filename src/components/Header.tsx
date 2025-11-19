import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'; // 👈 Importante para a navegação
import { Cart } from './Cart';
import logoImage from '../assets/logo-Kataplum.png';

// Estilos
const LINK_HOVER_LINE_CLASS = "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[--brand-pink] to-[--brand-blue] transition-all group-hover:w-full";

interface NavItemProps {
  name: string;
  href: string;
  onClick?: () => void;
  mobile?: boolean;
}

const NavLink = ({ name, href, onClick, mobile = false }: NavItemProps) => {
  const baseClass = mobile
    ? "px-4 py-3 rounded-lg hover:bg-muted transition-colors block"
    : "text-foreground/80 hover:text-foreground transition-colors relative group";

  return (
    <HashLink to={href} smooth className={baseClass} onClick={onClick}>
      {name}
      {!mobile && <span className={LINK_HOVER_LINE_CLASS} />}
    </HashLink>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Catálogo', href: '/#catalog' },
    { name: 'Serviços', href: '/#services' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Contato', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20">

          {/* 1. BLOCO ESQUERDA */}
          <div className="flex-1 flex justify-start">
            <HashLink to="/#home" className="transition-transform hover:scale-105">
              <img src={logoImage} alt="Kataplum Logo" className="h-12 md:h-16 w-auto" />
            </HashLink>
          </div>

          {/* 2. BLOCO CENTRO */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
          </nav>

          {/* 3. BLOCO DIREITA */}
          <div className="flex-1 flex justify-end items-center gap-3">

            <div className="hidden md:block">
              <Cart />
            </div>
            
            {/* 🚀 BOTÃO TRANSFORMADO EM LINK */}
            <Link 
              to="/montar-festa"
              className="bg-gradient-to-r from-[--brand-pink] to-[--brand-blue] text-white px-4 py-2 rounded-lg font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              Monte sua Festa
            </Link>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-2">
              <Cart />
              <button
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-in slide-in-from-top-5 fade-in duration-200">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.name} {...item} mobile onClick={() => setIsMobileMenuOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}