import { useContext } from "react"
import { Link } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../OrderCard"
import { totalPrice } from "../../Utils"
import './styles.css'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () =>{
        const orderToAdd =  {
            date: '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        let orders = context.order
        orders.push(orderToAdd)
        context.setOrder(orders)
        context.setCartProducts([])
        context.setCount(0)
        context.closeCheckoutSideMenu()
        context.setSearchByTitle(null)        

        //console.log('Orders:',context.order);
    }

    return(
        <>
        {context.isCheckoutSideMenuOpen && (
          <aside className="checkout-side-menu flex flex-col fixed right-0 bg-white border border-black rounded-lg">
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                    <XMarkIcon className="h-6 w-6 text-black hover:cursor-pointer" />
                </div>
            </div>
            <div className="px-6 overflow-y-auto flex-1">
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title} 
                            imageUrl={product.image}
                            price={product.price}
                            handleDelete = {handleDelete} />
                    ))
                }
            </div>
            <div className="px-6">
                <p className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="font-medium text-lg">${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className="w-full bg-black my-2 py-3 text-white rounded-lg" onClick={ ()=> handleCheckout()}>Checkout</button>
                </Link>
            </div>
          </aside>
        )}
      </>
  
    )
}

export default CheckoutSideMenu