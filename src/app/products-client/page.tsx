"use client"
// Next.js 內建的資料快取和重新驗證（Revalidation）功能無法直接用於客戶端元件，因此可以使用第三方套件如 React Query 來處理
// 客戶端元件不只能夠直接請求外部 API，也可以呼叫 Next.js 的 API 路由處理器
import {useState, useEffect} from 'react';
type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
}
export default function ProductPage(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string| null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3100/products');
                if(!response.ok){
                    throw new Error('Something went wrong while fetching the data');
                }
                const products: Product[] = await response.json();
                setProducts(products);
            }
            catch(error){
                if(error instanceof Error){
                    setError(error.message);
                } else{
                    setError("An unknown error has occurred");
                }
            }
            finally{
                setLoading(false);
            }
        }
        fetchProducts()
    }, []);

    
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
    return <ul className="space-y-4 p-4">
        {products?.map(product => (
            <li key={product.id} className="bg-white shadow-md rounded-lg text-gray-700 p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-medium">${product.price}</p>
            </li>
        ))}
    </ul>
}