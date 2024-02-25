import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Layout from "../../Components/Layout"
import OrderCard from "../../Components/OrderCard"

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  //console.log(context.order?.slice(-1)[0].products)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1) 
  console.log(index);

  if(index === 'last') index = context.order?.length - 1

  console.log(index);

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer"/>
        </Link>
        <h1>My Order</h1>
      </div>

      <div className="flex flex-col w-80">
        {
          context.order?.[index]?.products.map(product => (
            <OrderCard
            key={product.id}
            id={product.id}
            title={product.title} 
            imageUrl={product.image}
            price={product.price}/>
          ))
        }
      </div>

    </Layout>
  )
}

export default MyOrder
  