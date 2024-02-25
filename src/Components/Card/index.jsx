import { useContext } from "react"
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid" 
import { ShoppingCartContext } from "../../Context"
import { totalPrice } from "../../Utils"

const Card = (data) => {
    
    const context = useContext(ShoppingCartContext)


    const showProduct = (productDetail) => {
        context.closeCheckoutSideMenu()
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }

    const addProductsToCart = (event, productData) => {
        //console.log(productData);
        event.stopPropagation()
        context.setCount(context.count + 1)
        let products = context.cartProducts
        products.push(productData)
        context.setCartProducts(products)
        context.closeProductDetail()
        context.openCheckoutSideMenu()
        context.setTotalPrice(totalPrice(products))
        //console.log(context.cartProducts)

    }

    const renderIcon = (id) => {

        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

        if(isInCart){
            return(
                <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full">
                    <CheckIcon className="h-6 w-6 text-white" />
                </div>
    
            )
        } else {
            return(
                <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full"
                    onClick={ (event) => {
                        addProductsToCart(event,data.data) // incrementa el contador
    
                    }}>
                    <PlusIcon className="h-6 w-6 text-black-500"/>
                </div>
    
            )
        }
    }

    return(
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg m-4 p-4" onClick={ () => showProduct(data.data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs px-4 py-2 mr-4">{data.data?.category}</span>
                <img className="w-full h-full" src={data.data.image} alt={data.data.title} />
                {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between items-center">
                <span className="text-sm font-light">{data.data.title}</span>
                <span className="text-lg font-semibold">${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card