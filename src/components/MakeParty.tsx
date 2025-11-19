import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { useCart } from './CartContext';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  PackageOpen
} from 'lucide-react';

const API_URL_FULL = `${import.meta.env.VITE_API_URL}/itens-avulsos`;

const ETAPAS_FESTA = [
  "Pratos","Suportes","Vasos","Arranjos de Flor","Piruliteiras","Bolo (Maquetes)","Cilindros",
  "Mesas","Cubos","Palcos","Painéis de Tecido","Suporte para Painéis","Painéis de Madeira",
  "Tapetes","Totens","Elementos","Outros"
];

interface ItemAPI {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url: string;
  categoria?: string;
  tags?: string[] | string;
}

interface PartyItem {
  id: number;
  nome: string;
  descricao: string;
  imagem_url: string;
  category: string; 
}

export function MakeParty() {
  const [items, setItems] = useState<PartyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { addToCart } = useCart();

  // 🔹 useEffect de carregamento de itens
  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
      try {
        const res = await axios.get<any>(API_URL_FULL);
        const dataArray = (Array.isArray(res.data) ? res.data : res.data.itens) || [];

        const formattedItems: PartyItem[] = dataArray.map((item: ItemAPI) => {
          let rawCategory = 'Outros';
          let tagsData = item.tags;

          if (typeof tagsData === 'string' && (tagsData.startsWith('[') || tagsData.startsWith('"['))) {
            try { tagsData = JSON.parse(tagsData); } 
            catch (e) { console.warn("Erro ao parsear tag:", tagsData); }
          }

          if (item.categoria && item.categoria.trim() !== '') rawCategory = item.categoria;
          else if (tagsData) {
            if (Array.isArray(tagsData) && tagsData.length > 0) rawCategory = tagsData[0].trim();
            else if (typeof tagsData === 'string') rawCategory = tagsData.split(',')[0].trim();
          }

          const categoryFinal = rawCategory.trim() === '' ? 'Outros' : rawCategory.trim();

          return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao || '',
            imagem_url: item.imagem_url,
            category: categoryFinal,
          };
        });

        setItems(formattedItems);

      } catch (error) {
        console.error("Erro ao buscar itens:", API_URL_FULL, error);
        toast.error("Erro ao buscar itens. Verifique o servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentCategoryName = ETAPAS_FESTA[currentStepIndex];

  const currentStepItems = useMemo(() => {
    if (isFinished) return [];
    return items.filter(item => item.category.toLowerCase() === currentCategoryName.toLowerCase());
  }, [items, currentCategoryName, isFinished]);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStepIndex < ETAPAS_FESTA.length - 1) setCurrentStepIndex(prev => prev + 1);
    else setIsFinished(true);
  };

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setIsFinished(false);
    }
  };

  const handleAddItem = (item: PartyItem) => {
    addToCart({
      id: item.id,
      name: item.nome,
      descricao: item.descricao,
      image: item.imagem_url,
      category: item.category,
    });
    toast.success(`${item.nome} selecionado!`);
  };

  const progressPercentage = ((currentStepIndex + 1) / ETAPAS_FESTA.length) * 100;

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E91E63]"></div>
      <p className="mt-4 text-gray-500 font-medium">Preparando seu assistente de festa...</p>
    </div>
  );

  if (isFinished) return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Você concluiu a seleção!</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Todos os itens selecionados foram adicionados ao seu orçamento.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button variant="outline" className="flex-1 h-12 text-lg"
          onClick={() => { setIsFinished(false); setCurrentStepIndex(0); }}
        >
          Começar de novo
        </Button>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">Abra o carrinho no topo para finalizar</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Barra de progresso */}
      <div className="sticky top-[64px] md:top-[80px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs font-bold text-[#E91E63] tracking-wider uppercase mb-1">
                Passo {currentStepIndex + 1} de {ETAPAS_FESTA.length}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 leading-none">
                Escolha: <span className="text-[#E91E63]">{currentCategoryName}</span>
              </h2>
            </div>
            <div className="hidden md:block text-sm text-gray-400 font-medium">
              Próximo: {ETAPAS_FESTA[currentStepIndex + 1] || 'Finalizar'}
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#E91E63] h-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Grid de itens */}
      <div className="container mx-auto px-4 py-8">
        {currentStepItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-in slide-in-from-right-8 fade-in duration-300">
            {currentStepItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-pink-200 transition-all group flex flex-col">
                <div className="relative aspect-square bg-gray-100">
                  <img src={item.imagem_url || 'https://placehold.co/400x400?text=Item'} alt={item.nome} className="w-full h-full object-cover" />
                  <button onClick={() => handleAddItem(item)} className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-black px-4 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      Adicionar
                    </span>
                  </button>
                </div>
                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 mb-1">{item.nome}</h3>
                  <div className="mt-auto pt-3">
                    <Button size="sm" variant="outline" className="w-full border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white" onClick={() => handleAddItem(item)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <PackageOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum item disponível em "{currentCategoryName}"</h3>
            <p className="text-gray-500 max-w-xs mx-auto mb-6">Não encontramos itens cadastrados nesta categoria específica.</p>
            <Button variant="ghost" onClick={handleNext} className="text-[#E91E63]">Pular para próxima categoria &rarr;</Button>
          </div>
        )}
      </div>

      {/* Rodapé de navegação */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="container mx-auto max-w-4xl flex justify-between items-center gap-4">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStepIndex === 0} className={`flex-1 md:flex-none ${currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
            <ChevronLeft className="w-4 h-4 mr-2" />Voltar
          </Button>
          <div className="hidden md:block text-sm text-gray-500">{currentStepItems.length} opções encontradas</div>
          <Button size="lg" onClick={handleNext} className="flex-1 md:min-w-[200px] bg-[#E91E63] hover:bg-[#d81557] text-white font-bold rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95">
            {currentStepIndex === ETAPAS_FESTA.length - 1 ? (
              <span className="flex items-center">Finalizar Seleção <CheckCircle2 className="w-5 h-5 ml-2" /></span>
            ) : (
              <span className="flex items-center">Próximo Passo <ChevronRight className="w-5 h-5 ml-2" /></span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
