import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { useCart } from '../components/CartContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ProductAPI {
  id: number;
  nome: string;
  imagem_url: string;
  tags: string[] | string;
  descricao?: string;
  preco?: number;
}

interface Product {
  id: number;
  nome: string;
  imagem_url: string;
  tags: string[];
  category: string;
  descricao: string;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchProdutos = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/produtos`);
        const produtosArray: ProductAPI[] = res.data.produtos || res.data.itens || res.data || [];

        const produtosFormatados: Product[] = produtosArray.map((p) => {
          let tagsArray: string[] = [];
          if (Array.isArray(p.tags)) tagsArray = p.tags;
          else if (typeof p.tags === 'string')
            tagsArray = p.tags.split(',').map((t) => t.trim());

          return {
            id: p.id,
            nome: p.nome,
            imagem_url: p.imagem_url,
            tags: tagsArray,
            category: tagsArray.length > 0 ? tagsArray[0] : 'Geral',
            descricao: p.descricao || 'Este item não possui descrição.',
          };
        });

        setProducts(produtosFormatados);
      } catch (err) {
        console.error('❌ Erro ao buscar produtos:', err);
        toast.error("Falha ao carregar destaques.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProdutos();
  }, [apiUrl]);

  const productsToDisplay = products.slice(0, 6);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.nome,
      descricao: product.descricao,
      image: product.imagem_url,
      category: product.category,
    });
    toast.success(`${product.nome} adicionado ao orçamento!`);
  };

  return (
    <section className="py-20 bg-white" id="products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-full mb-6 ring-1 ring-orange-100">
            <Sparkles className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Destaques da <span className="text-[#F59E0B]">Kataplum</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Os itens mais desejados para transformar sua festa em um espetáculo.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-20 animate-pulse">Buscando produtos incríveis...</div>
        ) : productsToDisplay.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Nenhum produto em destaque no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="
                  group bg-white rounded-[20px] overflow-hidden 
                  border border-gray-100 
                  hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10
                  transition-all duration-300 ease-out flex flex-col relative
                "
              >
                {/* Imagem */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img
                    src={product.imagem_url || 'https://placehold.co/600x400?text=Sem+Imagem'}
                    alt={product.nome}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge Popular (Rosa para contraste com o Laranja) */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#E91E63] hover:bg-[#D81B60] text-white border-0 shadow-lg px-3 py-1 text-xs font-bold tracking-wide uppercase">
                      Popular
                    </Badge>
                  </div>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-400 hover:text-[#E91E63] transition-all shadow-sm"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.has(product.id) ? 'fill-[#E91E63] text-[#E91E63]' : ''}`}
                    />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#F59E0B] transition-colors">
                    {product.nome}
                  </h3>

                  <div className="mb-6 flex-1">
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {product.descricao}
                    </p>
                  </div>

                  <div className="mt-auto pt-5 border-t border-gray-50">
                    
                    {/* 🔥 BOTÃO SUPIMPA (AÇÃO PRIMÁRIA) 
                      Cor: #F59E0B (Laranja da Marca) SÓLIDO.
                      Texto: Branco.
                      Efeito: Sombra colorida suave no hover + leve subida.
                      Viés Cognitivo: Cor Quente = Ação, Impulso.
                    */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="
                        w-full h-12 rounded-xl 
                        flex items-center justify-center gap-2 
                        bg-[#F59E0B] hover:bg-[#ea8f00]
                        text-white font-bold text-sm tracking-wide
                        shadow-md shadow-orange-500/20 
                        hover:shadow-lg hover:shadow-orange-500/30
                        hover:-translate-y-0.5
                        transition-all duration-200
                      "
                    >
                      <ShoppingCart className="w-4 h-4" />
                      ADICIONAR AO ORÇAMENTO
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          {/* 🌬️ BOTÃO VER MAIS (NAVEGAÇÃO SECUNDÁRIA)
             Cor: Neutra (Preto/Cinza).
             Estilo: Outline / Vazado.
             Viés: Não compete com o botão de compra. Diz "Estou aqui se você quiser ver mais, mas compre primeiro".
          */}
          <Link 
            to="/produtos"
            className="
              inline-flex items-center justify-center gap-2
              h-14 px-10 rounded-full 
              bg-white text-gray-900 font-bold
              border-2 border-gray-200
            "
          >
            Explorar Catálogo Completo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}