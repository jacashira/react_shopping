import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'


export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut
  
    if (!accountInLocalStorage) {
      localStorage.setItem('account', JSON.stringify({}))
      parsedAccount = {}
    } else {
      parsedAccount = JSON.parse(accountInLocalStorage)
    }
  
    if (!signOutInLocalStorage) {
      localStorage.setItem('sign-out', JSON.stringify(false))
      parsedSignOut = false
    } else {
      parsedSignOut = JSON.parse(signOutInLocalStorage)
    }
  }


export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    
    ShoppingCartProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }

    // My account
    const [account, setAccount] = useState({})

    // Sign out
    const [signOut, setSignOut] = useState(false)

    //Product Detail . Increment quantity
    const [count,setCount] = useState(0)

    const [totalPrice,setTotalPrice] = useState(0)
    
    //Product Detail . Open/Close
    const [isProductDetailOpen,setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Checkout Side Menu. Open/Close
    const [isCheckoutSideMenuOpen,setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)
    
    
    //Product Detail . show product
    const [productToShow,setProductToShow] = useState({})
    
    //Shopping Cart . add products to cart
    const [cartProducts,setCartProducts] = useState([])

    //Shopping Cart . add products to cart
    const [order,setOrder] = useState([])

    //Get products
    const [items,setItems] = useState(null)
    const [filteredItems,setFilteredItems] = useState(null)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
    },[])
    

    //Get products by title
    const [searchByTitle,setSearchByTitle] = useState('')

    const filteredItemByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    //Get products by category
    const [searchByCategory,setSearchByCategory] = useState('')

    const filterItemByCategory = (items,searchByCategory) => {
        //console.log("---->",searchByCategory,"---")
        if(searchByCategory === 'all')
            return items
        else
            return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    useEffect(() => {
        if(searchByTitle && searchByCategory) setFilteredItems(filteredItemByTitle(filterItemByCategory(items,searchByCategory),searchByTitle))
        else {
            if(searchByTitle) setFilteredItems(filteredItemByTitle(items,searchByTitle))
            if(searchByCategory) setFilteredItems(filterItemByCategory(items,searchByCategory))
        }
    },[items, searchByTitle,searchByCategory])

    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            isProductDetailOpen,
            openProductDetail,
            closeProductDetail,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            totalPrice,
            setTotalPrice,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}