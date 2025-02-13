type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
}

// 在 /products 頁面，layout.tsx & page.tsx 都對 /products 的資料進行 fetch，但觀察 node server 終端機只會進行一次 fetch data，
// 請求記憶 (Request Memoization) 是 React 內建的最佳化技術，可避免在同一次渲染中發送重複請求。
// 但該機制僅適用於 GET 請求
export default async function Layout ({children}: {children: React.ReactNode}) {
    const response = await fetch('http://localhost:3100/products');
    const products: Product[] = await response.json();
    console.log({products})
    return <div className="container mx-auto p-4">
        {children}
    </div>
}