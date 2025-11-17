import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from './CartContext';
import { toast } from 'sonner';
import { Heart, ShoppingCart, Sparkles, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// Interfaces (Limpas)
interface ProductAPI {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url: string;
  tags: string[] | string;
  preco?: number;
}
interface Product {
  id: number;
  nome: string;
  descricao: string;
  imagem_url: string;
  tags: string[];
  category: string;
  popular?: boolean;
  price?: number;
}

export function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFromUrl = searchParams.get('tag');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(tagFromUrl || null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const { addToCart } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Busca na API (com tratamento de erro)
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/produtos`);
        const produtosArray = res.data.produtos || res.data.itens || res.data || [];

        const produtosFormatados: Product[] = produtosArray.map((p: ProductAPI) => {
          let tagsArray: string[] = [];
          if (Array.isArray(p.tags)) tagsArray = p.tags;
          else if (typeof p.tags === 'string')
            tagsArray = p.tags.split(',').map((t) => t.trim());

          return {
            id: p.id,
            nome: p.nome,
            descricao: p.descricao || 'Este item não possui descrição.',
            imagem_url: p.imagem_url,
            tags: tagsArray,
            category: tagsArray.length > 0 ? tagsArray[0] : 'Outros',
            popular: true,
          };
        });
        setAllProducts(produtosFormatados);
      } catch (error) {
        console.error('ERRO AO BUSCAR PRODUTOS:', error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [apiUrl]);

  // Lógica de tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allProducts.forEach((product) => {
      if (product.category) tagsSet.add(product.category);
    });
    return Array.from(tagsSet).sort(); // Ordenei alfabeticamente
  }, [allProducts]);

  // Filtro
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        if (selectedTag === null) return true;
        return product.category.toLowerCase() === selectedTag.toLowerCase();
      })
      .filter((product) => {
        return product.nome.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [allProducts, selectedTag, searchTerm]);

  // Ações
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
  
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setSearchParams({ tag: tag });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 py-24 text-center">Carregando produtos...</div>
    );
  }

  // JSX
  return (
    <div className="container mx-auto p-4 py-16 md:py-24">
      {/* 👇 TÍTULO ESTILIZADO 👇 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-orange-50 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Nosso <span className="text-[#F59E0B]">Catálogo</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24 space-y-8"> {/* Deixa os filtros fixos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Buscar por nome</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search-name"
                  type="text"
                  placeholder="Nome do item..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* 👇 FILTROS (TAGS) LARANJA 👇 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  // Laranja Sólido se 'Todas' estiver selecionado
                  className={`cursor-pointer transition-colors ${
                    selectedTag === null
                      ? 'bg-[#F59E0B] text-white hover:bg-[#d97706]'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                  onClick={() => handleTagSelect(null)}
                >
                  Todas
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    // Laranja Sólido se a tag estiver selecionada
                    className={`cursor-pointer transition-colors ${
                      selectedTag?.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#F59E0B] text-white hover:bg-[#d97706]'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- CONTEÚDO PRINCIPAL (GRID) --- */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              Exibindo: {filteredProducts.length} resultados
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#F59E0B]/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={product.imagem_url || 'https://placehold.co/600x400?text=Sem+Imagem'}
                      alt={product.nome}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge Popular (Rosa) */}
                    <Badge className="absolute top-3 left-3 bg-[#E91E63] text-white border-0 shadow-sm px-3 py-1">
                      Popular
                    </Badge>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.has(product.id)
                            ? 'fill-[#E91E63] text-[#E91E63]'
                            : 'text-gray-400 hover:text-[#E91E63]'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      {/* 👇 Badge Categoria (Azul Pastel) 👇 */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#00AEEF]/10 text-[#00AEEF]">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="mb-2 font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-[#E91E63] transition-colors">
                      {product.nome}
                    </h3>
                    
                    <div className="mb-6 flex-1">
                      {/* 👇 Descrição com line-clamp (sem scrollbar) 👇 */}
                      <p className="text-sm text-gray-500 line-clamp-2 h-10 leading-relaxed">
                        {product.descricao}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      {/* 👇 BOTÃO LARANJA PASTEL (kataplum) 👇 */}
                      <Button
                        size="lg"
                        variant="kataplum"
                        className=" w-full h-12 rounded-xl 
                        flex items-center justify-center gap-2 
                        bg-[#F59E0B] hover:bg-[#ea8f00]
                        text-white font-bold text-sm tracking-wide
                        shadow-md shadow-orange-500/20 
                        hover:shadow-lg hover:shadow-orange-500/30
                        hover:-translate-y-0.5
                        transition-all duration-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Orçar Agora
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p>Nenhum produto encontrado com esses filtros.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}