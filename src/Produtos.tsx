import { useEffect, useState } from "react";
import axios from "axios";

interface Camera{
    frontCamera: string
    rearCamera: string
}

interface Objeto {
    id: string
    name: string
    brand: string
    description: string
    basePrice:  number
    inStock: boolean
    stock: number
    productCategory: string
    featuredImage: string
    thumbnailImage: string
    storageOptions: Array<string>
    colorOptions: Array<string>
    display: string
    CPU: string
    GPU: string
    camera?: Camera
  }

export function ProductsView() {
  const [produtos, setProdutos] = useState<[] | Objeto[]>([]);
  const [popUp, setPopUp] = useState<string>('')
  

  useEffect(() => {
    axios
      .get("https://dummyapi.online/api/products")
      .then((Response) => setProdutos(Response.data));
  }, []);

  console.log(produtos);
  
  function AbaOnClick(){
    const produto = produtos[Number(popUp)-1]
   
    return(
      <>
      <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm flex place-content-center place-items-center '>
      <div className='grid grid-rows-10 grid-cols-10 w-3/5 h-3/5 bg-white rounded-xl'>
      <div className='p-2' style={{gridArea: '1 / 11 / 1 / end', placeSelf:'start'}} onClick={() => setPopUp('')}>X</div>
      <img className='p-2 rounded-xl ' style={{gridArea: '1 / 1 / 4 / 4', placeSelf:'start'}} src={produto.featuredImage} alt={produto.name}/>
      <div className='p-2 text-2xl' style={{gridArea: '1 / 4 / 1 / 11', placeSelf:'stretch'}}>{produto.brand} {produto.productCategory} {produto.name}</div>
      <div className='p-2' style={{gridArea: '2 / 4 / 4 / 11', placeSelf:'stretch'}}>{produto.description}</div>
      <div className='p-2' style={{gridArea: '5 / 1 / 6 / 9', placeSelf:'start', alignSelf: 'end'}}>CPU: {produto.CPU}</div>
      <div className='p-2' style={{gridArea: '6 / 1 / 6 / 9', placeSelf:'start', alignSelf: 'center'}}>GPU: {produto.GPU}</div>
      <div className='p-2' style={{gridArea: '7 / 1 / 7 / 9', placeSelf:'start'}}>Display: {produto.display}</div>
      {produto.camera?.frontCamera != undefined && 
      <><div className='p-2' style={{gridArea: '8 / 1 / 8 / 9', placeSelf:'start'}}>Camera:</div>
      <div className='p-2' style={{gridArea: '9 / 1 / 9 / 9', placeSelf:'start'}}>Front: {produto.camera.frontCamera}</div>
      <div className='p-2' style={{gridArea: '10 / 1 / 10 / 9', justifySelf:'start'}}>Rear: {produto.camera.rearCamera}</div></>}
      <label className='p-2' style={{gridArea:'4 / 9 / 5 / end ', alignSelf:'end', justifySelf:'start'}}>Colors:</label>
      <select className='p-2' style={{gridArea:'5 / 9 / 6 / 11 ', placeSelf:'stretch'}} id='cor'>{produto.colorOptions.map((cor) => (
       <option className='p-2' key={cor} value={cor}>{cor}</option>     
        ))}
      </select>
      <label className='p-2' style={{gridArea:'6 / 9 / 7 / end ', alignSelf:'end', justifySelf:'start'}}>Storage Options:</label>
      <select className='p-2' style={{gridArea:'7 / 9 / 8 / 11 ', placeSelf:'stretch'}} id='Storage'>{produto.storageOptions.map((storage) => (
       <option className='p-2' key={storage} value={storage}>{storage}</option>
      ))}
      </select>
      <div className='p-2' style={{gridArea:'8 / 9 / 8 / end', justifySelf:'start'}}>In Stock: {produto.stock}</div>
      <button className=" p-2 bg-blue-500 hover:bg-violet-500 active:bg-violet-700"
      style= {{gridArea:'9 / 9 / 10 / 11', placeSelf: 'stretch'}}>BUY</button>
      </div>
      </div>
      </>
    )



  }






  return (
    <div>
      <h1 className="p-10 bg-blue-900 text-blue-300">Produtos</h1>
      <ul className='grid grid-cols-4 gap-5 w-full bg-slate-500'>
        {produtos.map((produto) => (
          <li  key={produto.id} onClick={() => setPopUp(produto.id)}>
            <div>
            <img
            className="block" 
            src={produto.thumbnailImage} 
            alt={produto.name} 
            width={1000}
            height={1000}
            />
            </div>
          </li>
        ))}
        {popUp && AbaOnClick()}
      </ul>
      </div>
  );
}
