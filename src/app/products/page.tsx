type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
}
// 本元件原先想要展示 cacheing data(教學影片使用 Next.js 14)，操作步驟為：訪問 /products 並在頁面上看見產品列表， 修改 db.json 的產品價格並重新運行 node server，
// 重整 /products 會看到價格並沒有更新，且終端機不會再印出 "Request received" 
// 但本專案使用 Next.js 15 ，且這個版本已經沒有 default cacheing
export default async function ProductPage(){
    // 運行 node server
    const response = await fetch('http://localhost:3100/products');
    const products: Product[] = await response.json();
    return <ul className="space-y-4 p-4">
        {products.map(product => (
            <li key={product.id} className="bg-white shadow-md rounded-lg text-gray-700 p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-medium">${product.price}</p>
            </li>
        ))}
    </ul>
}