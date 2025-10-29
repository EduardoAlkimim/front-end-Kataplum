import { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from './CartContext';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  popular: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Disney Princess Castle Backdrop',
    category: 'Disney',
    price: 89.99,
    rating: 5,
    image: '',
    popular: true,
  },
  {
    id: 2,
    name: 'Superhero Photo Booth Props',
    category: 'Superhero',
    price: 45.99,
    rating: 5,
    image: '',
    popular: true,
  },
  {
    id: 3,
    name: 'Retro 80s Disco Ball Set',
    category: '80s',
    price: 65.99,
    rating: 4,
    image: '',
    popular: false,
  },
  {
    id: 4,
    name: 'Birthday Balloon Arch Kit',
    category: 'Birthday',
    price: 79.99,
    rating: 5,
    image: '',
    popular: true,
  },
  {
    id: 5,
    name: 'Premium Table Decoration Set',
    category: 'Birthday',
    price: 55.99,
    rating: 4,
    image: '',
    popular: false,
  },
  {
    id: 6,
    name: 'Party Games Activity Kit',
    category: 'Games',
    price: 39.99,
    rating: 5,
    image: '',
    popular: true,
  },
];

export function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();

  const categories = ['All', 'Disney', 'Superhero', '80s', 'Birthday', 'Games'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Produtos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pesquise pelos nossos melhores equipamentos e temas.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[--brand-pink] to-[--brand-blue] text-white shadow-md'
                  : 'bg-white border border-border hover:border-[--brand-orange] hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-border hover:border-[--brand-pink] hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {/*<ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />*/}
                {product.popular && (
                  <Badge className="absolute top-3 left-3 bg-[--brand-orange] text-white border-0">
                    Popular
                  </Badge>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                  aria-label={favorites.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(product.id)
                        ? 'fill-[--brand-pink] text-[--brand-pink]'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h3 className="mb-3" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < product.rating
                          ? 'fill-[--brand-orange] text-[--brand-orange]'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.rating}.0)
                  </span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">/rental</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[--brand-blue] to-[--brand-green] hover:opacity-90 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-[--brand-pink] text-[--brand-pink] hover:bg-gradient-to-r hover:from-[--brand-pink] hover:to-[--brand-blue] hover:text-white hover:border-transparent"
          >
            Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
}
