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
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label={`Shopping cart with ${totalItems} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[--brand-pink] text-white flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? 'Your cart is empty'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-6">
              Start adding items to your cart!
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    {/* <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="truncate mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between py-4 border-t border-border">
                <span className="text-lg">Total</span>
                <span className="text-2xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full bg-[--brand-pink] hover:bg-[--brand-pink]/90 text-white"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
