// src/components/ProductDetailPage.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useCart } from './CartContext';

interface ProductDetail {
    id: number;
    nome: string;
    descricao: string;
    tags: string;
    galeria: string[];
    category: string;
}

export function ProductDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>('');

    const { addToCart } = useCart();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    useEffect(() => {
        const API_URL = `${apiUrl}/produtos/${id}`;

        async function fetchItem() {
            try {
                const res = await axios.get(API_URL);
                const data = res.data.produto;

                let galeriaArray: string[] = [];
                if (data.galeria) {
                    if (typeof data.galeria === 'string') {
                        try {
                            galeriaArray = JSON.parse(data.galeria);
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (e) {
                            galeriaArray = [data.galeria];
                        }
                    } else if (Array.isArray(data.galeria)) {
                        galeriaArray = data.galeria;
                    }
                }

                const formattedItem = { ...data, galeria: galeriaArray, category: data.tags || 'Geral' };

                setItem(formattedItem);
                if (galeriaArray.length > 0) {
                    setMainImage(galeriaArray[0]);
                }

            } catch (error) {
                console.error("Erro ao buscar detalhes do produto:", error);
                toast.error("Produto não encontrado. Verifique a rota /produtos/:id");
            } finally {
                setIsLoading(false);
            }
        }
        fetchItem();
    }, [id, apiUrl]);

    if (isLoading) {
        return <div className="p-16 text-center">Carregando detalhes do produto...</div>;
    }

    if (!item) {
        return <div className="p-16 text-center text-red-500">Erro: Produto não encontrado.</div>;
    }

    const handleAddToCart = () => {
        const image = item.galeria.length > 0 ? item.galeria[0] : '';

        addToCart({
            id: item.id,
            name: item.nome,
            descricao: item.descricao,
            image: image,
            category: item.category,
        });
        toast.success(`"${item.nome}" adicionado ao orçamento!`);
    };


    return (
        <div className="container mx-auto p-8 pt-12">
            <Link to="/produtos" className="inline-flex items-center text-gray-500 hover:text-[#E91E63] transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Catálogo
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">


                {/* 1. GALERIA DE IMAGENS */}
                <div className="w-full lg:w-1/2">
                    {/* Imagem principal */}
                    <img
                        src={mainImage || 'https://placehold.co/800x600?text=Sem+Imagem'}
                        alt={item.nome}
                        className="w-full aspect-[4/3] object-cover rounded-xl shadow-xl border border-gray-200 mb-4"
                    />

                    {/* Thumbnails */}
                    {item.galeria.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {item.galeria.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Miniatura ${index + 1}`}
                                    onClick={() => setMainImage(url)}
                                    className={`w-24 h-20 object-cover rounded-md cursor-pointer border-2 transition-colors ${url === mainImage ? 'border-[#E91E63] shadow-md' : 'border-gray-300 hover:border-pink-300'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. DETALHES E AÇÕES */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <span className="inline-block bg-[#E91E63] text-white text-sm px-3 py-1 rounded-full">{item.category}</span>
                    <h1 className="text-4xl font-bold text-gray-900">{item.nome}</h1>

                    <div>
                        <h3 className="text-xl font-semibold mb-2 mt-4">Descrição</h3>
                        <p className="text-gray-600 leading-relaxed">{item.descricao}</p>
                    </div>

                    <Button
                        size="lg"
                        className="w-full md:w-auto bg-[#E91E63] hover:bg-[#d81557] text-white font-bold rounded-xl shadow-lg transition-all mt-6"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Adicionar ao Orçamento
                    </Button>

                </div>
            </div>
        </div>
    );
}