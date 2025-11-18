import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useCart } from './CartContext';

export function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  const handleGoToWhatsApp = () => {
    const seuNumeroDeWhatsApp = "5561996291414";

    const itensDoPedido = items.map(item =>
      `${item.quantity}x ${item.name}`
    ).join('\n');

    const mensagem = `Olá!\n\nGostaria de solicitar um orçamento para os seguintes itens:\n\n${itensDoPedido}\n\nObrigado!`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/${seuNumeroDeWhatsApp}?text=${mensagemCodificada}`;

    window.open(whatsappUrl, '_blank');
  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-lg border-gray-200" // Deixei a borda mais suave
          aria-label={`Carrinho com ${totalItems} itens`}
        >
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {totalItems > 0 && (
            // 👇 CORREÇÃO NA COR DO BADGE (Rosa sólido da marca)
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#E91E63] text-white flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white/90 backdrop-blur-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Meu Orçamento</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? 'Seu carrinho está vazio'
              : `${totalItems} item${totalItems !== 1 ? 'ns' : ''} no seu orçamento`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500">Seu carrinho de orçamento está vazio.</p>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg border border-gray-100 bg-white"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image || 'https://placehold.co/100x100?text=Sem+Foto'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate mb-1 text-gray-800">{item.name}</h4>

                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {item.category} {/* Mostrando categoria em vez de descrição */}
                    </p>

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remover do carrinho"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              
              {/* 👇 CORREÇÃO NO BOTÃO DE ORÇAMENTO (Usando a variant "kataplum") */}
              <Button
                variant="kataplum" // <-- AQUI! (Laranja Pastel)
                size="lg"
                className="w-full rounded-xl" // Arredondado
                onClick={handleGoToWhatsApp}
              >
                Solicitar Orçamento
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-xl border-destructive/30 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={clearCart}
              >
                Limpar Orçamento
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}