import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ShoppingCartContext } from "../../Context"
import './styles.css'


const ProductDetail = () => {
  const { isProductDetailOpen, closeProductDetail, productToShow } = useContext(ShoppingCartContext);
   
  return (
    <>
      {isProductDetailOpen && (
        <aside className="product-detail flex flex-col fixed right-0 bg-white border border-black rounded-lg ">
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">Detail</h2>
                    <div onClick={() => closeProductDetail()}>
                    <XMarkIcon className="h-6 w-6 text-black hover:cursor-pointer" />
                </div>
            </div>
            <figure className="px-6">
                <img className="w-full h-full rounded-lg" src={productToShow.image} alt={productToShow.title} />
            </figure>
            <p className="flex flex-col p-6">
                <span className="">{productToShow.price}</span>
                <span className="font-medium text-md m-2">{productToShow.title}</span>
                <span className="font-light text-sm m-2">{productToShow.description}</span>

            </p>

        </aside>
      )}
    </>
  )
}

export default ProductDetail;