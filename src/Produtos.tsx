import { useEffect, useState } from "react";
import axios from "axios";

interface Objeto {
  id: string;
  name: string;
  brand: string;
  description: string;
  basePrice: number;
  inStock: boolean;
  stock: number;
  featuredImage: string;
  thumbnailImage: string;
  storageOpions: Array<string>;
  colorOptions: Array<string>;
  display: string;
  CPU: string;
  camera: Array<object>;
}

export function ProductsView() {
  const [produtos, setProdutos] = useState<[] | Objeto[]>([]);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyapi.online/api/products")
      .then((Response) => setProdutos(Response.data));
  }, []);

  console.log(produtos);

  function AbaOnClick(produto = Object) {
    return;

    <></>;
  }

  return (
    <div>
      <h1>Produtos</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4rem",
          width: "100%",
        }}
      >
        {produtos.map((produto) => (
          <li onClick={() => setPopUp(true)} key={produto.id}>
            <div
              style={{
                flex: "1 0 45%",
                maxWidth: "45%",
                flexFlow: "row wrap",
                flexWrap: "wrap",
                flexGrow: "3",
                justifyContent: "space-Between",
                boxSizing: "border-box",
              }}
            >
              <img
                className=""
                src={produto.thumbnailImage}
                alt={produto.name}
                width={1000}
                height={1000}
              />
            </div>
          </li>
        ))}
      </ul>
      {popUp && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "30%",
              height: "30%",
              backgroundColor: "red",
              borderRadius: "5%",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
