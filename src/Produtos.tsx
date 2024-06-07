import { useEffect, useState } from "react";
import axios from "axios";

interface Objeto {
    id: string
    name: string
    brand: string
    description: string
    basePrice:  number
    inStock: boolean
    stock: number
    featuredImage: string
    thumbnailImage: string
    storageOpions: Array<string>
    colorOptions: Array<string>
    display: string
    CPU: string
    camera: Array<object>
  }


export function ProductsView() {
  const [produtos, setProdutos] = useState<[] | Objeto[]>([]);

  

  useEffect(() => {
    axios
      .get("https://dummyapi.online/api/products")
      .then((Response) => setProdutos(Response.data));
  }, []);

  console.log(produtos);

  return (
    <>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>{produto.name}</li>
        ))}
      </ul>
    </>
  );
}
