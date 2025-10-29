import { Phone, MapPin} from 'lucide-react';
import logoImage from '../assets/logo-Kataplum.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
    ],
    services: [
      { name: 'Party Rentals', href: '#rentals' },
      { name: 'Event Planning', href: '#planning' },
      { name: 'Delivery & Setup', href: '#delivery' },
      { name: 'Custom Orders', href: '#custom' },
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'FAQs', href: '#faq' },
      { name: 'Rental Terms', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' },
    ],
  };

  return (
    <footer className="bg-foreground text-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="Kataplum" 
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="text-white/70 mb-6 max-w-sm">
              Criando uma festa especial para cada evento especial. Uma história pronta para ser contada e memorada.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="https://wa.me/5561996291414" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-[--brand-blue]" />
                <span>+55 (61) 99629-1414</span>
              </a>
              {/* <a href="mailto:hello@kataplum.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-[--brand-orange]" />
                <span>hello@kataplum.com</span>
              </a> */}
              <div className="flex items-start gap-3 text-white/70">
               <a href="https://share.google/v0LeEBFGHsPnFDvaE"  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"> 
                 <MapPin className="w-8 h-8 text-[--brand-green]"/>
                <span> Setor Industrial QI 2 Lote 940/980 - Pte. Alta Norte (Gama) <br/> Brasília - DF, 72445-020</span>
               </a> 
              </div> 
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10"> 
            <p className="text-white/50 text-sm">
              © {currentYear} Kataplum. All rights reserved.
            </p>
          </div>
        </div>
    </footer>
  );
}
