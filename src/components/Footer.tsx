import { Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/logo-Kataplum.png';
import { HashLink } from 'react-router-hash-link'; // <-- 1. IMPORTAR O HASHLINK

export function Footer() {
  const currentYear = new Date().getFullYear();

  // 2. LINKS TRADUZIDOS
  const footerLinks = {
    empresa: [
      { name: 'Sobre Nós', href: '/#about' },
      { name: 'Nossa História', href: '/#story' },
      // { name: 'Carreiras', href: '#careers' },
      // { name: 'Imprensa', href: '#press' },
    ],
    servicos: [
      { name: 'Aluguel de Itens', href: '/#rentals' },
      { name: 'Planejamento de Eventos', href: '/#planning' },
      { name: 'Entrega & Montagem', href: '/#delivery' },
      { name: 'Pedidos Customizados', href: '#custom' },
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '/#help' },
      { name: 'Dúvidas Frequentes', href: '/#faq' },
      { name: 'Termos de Aluguel', href: '/#terms' },
      { name: 'Política de Privacidade', href: '/#privacy' },
    ],
  };

  return (
    // 3. CORES CORRIGIDAS: bg-muted (cinza-claro) e text-foreground (preto)
    <footer className="bg-muted text-foreground" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <HashLink to="/#home" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="Kataplum" 
                // 4. FILTRO DA LOGO REMOVIDO
                className="h-12 w-auto" 
              />
            </HashLink>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Criando uma festa especial para cada evento especial. Uma história pronta para ser contada e memorada.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="https://wa.me/5561996291414" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                target="_blank" // Abrir WhatsApp em nova aba
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 text-[--brand-blue]" />
                <span>+55 (61) 99629-1414</span>
              </a>
              <a 
                href="https://share.google/v0LeEBFGHsPnFDvaE" 
                className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
                target="_blank" // Abrir Google Maps em nova aba
                rel="noopener noreferrer"
              >
                 <MapPin className="w-8 h-8 text-[--brand-green] flex-shrink-0"/>
                 <span> Setor Industrial QI 2 Lote 940/980 - Pte. Alta Norte (Gama) <br/> Brasília - DF, 72445-020</span>
              </a> 
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Empresa
            </h4>
            <ul className="space-y-2">
              {/* 5. TROCADO <a> por <HashLink> */}
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <HashLink
                    to={link.href}
                    smooth
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Serviços
            </h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link) => (
                <li key={link.name}>
                  <HashLink
                    to={link.href}
                    smooth
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Suporte
            </h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <HashLink
                    to={link.href}
                    smooth
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border"> {/* 6. COR DA BORDA CORRIGIDA */}
            <p className="text-muted-foreground/80 text-sm"> {/* 7. COR DO TEXTO CORRIGIDA */}
              © {currentYear} Kataplum. Todos os direitos reservados.
            </p>
          </div>
        </div>
    </footer>
  );
}