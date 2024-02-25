
import { useContext } from 'react'
import { ShoppingCartContext } from "../../Context"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from '../../Components/ProductDetail'

function Home() {

  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    //console.log(context.searchByTitle);
    if (context.searchByTitle?.length >0) {
      if(context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map((item) => (
            <Card key={item.id} data={item}/>
          ))
        )
      } else {
        return (
          <div>We dont have some products this parameter </div>
        )
      }
    } else {
      if (context.searchByCategory?.length >0) {
        if(context.filteredItems?.length > 0) {
          return (
            context.filteredItems?.map((item) => (
              <Card key={item.id} data={item}/>
            ))
          )
        } else {
          return (
            <div>We dont have some products this parameter </div>
          )
        }
      } else {
        return (
          context.items?.map((item) => (
            <Card key={item.id} data={item}/>
          ))
        )
      }
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input 
        type="text" 
        placeholder='Search a product' 
        className='border border-black rounded-lg p-4 mb-4 w-80 focus:outline-none'  
        onChange={ (event) => context.setSearchByTitle(event.target.value) }/>
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home
