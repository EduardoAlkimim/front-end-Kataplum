import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Cart } from './Cart';
import logoImage from '../assets/logo-Kataplum.png';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Catálogo', href: '#catalog' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre', href: '#about' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img 
              src={logoImage} 
              alt="Kataplum" 
              className="h-12 md:h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[--brand-pink] to-[--brand-blue] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button & Cart */}
          <div className="hidden md:flex items-center gap-3">
            <Cart />
            <Button 
              className="bg-gradient-to-r from-[--brand-pink] to-[--brand-orange] hover:opacity-90 text-white"
              asChild
            >
              <a href="#quote">Request Quote</a>
            </Button>
          </div>

          {/* Mobile Cart & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Cart />
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="mt-4 bg-gradient-to-r from-[--brand-pink] to-[--brand-orange] hover:opacity-90 text-white w-full"
              asChild
            >
              <a href="#quote">Request Quote</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
