import NavItem from "../NavItem"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import ShoppingCart from "../ShoppingCart"

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'

    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
      }

    const handleClick = (category) => {
        context.setSearchByCategory(category)
        context.setSearchByTitle('');
    }

    const renderView = () => {
        if(hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className='text-black/60'>
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavItem to="/my-orders" activeStyle={activeStyle}>
                            My Orders  
                        </NavItem>
                    </li>
                    <li>
                        <NavItem to="/my-account" activeStyle={activeStyle}>
                            My Account  
                        </NavItem>
                    </li>
                    <li>
                        <NavItem to="/sign-in" activeStyle={activeStyle} category="na" handleClick={handleSignOut}>
                            Sign out  
                        </NavItem>
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    <NavItem to="/sign-in" activeStyle={activeStyle} category="na" handleClick={handleSignOut}>
                        Sign In  
                    </NavItem>
                </li>
            )
        }
    }

    return (
        <nav className='flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavItem to={`${isUserSignOut ? '/sign-in' : '/'}`} activeStyle={activeStyle} category="all" handleClick={handleClick}>
                        Shopi
                    </NavItem>
                </li>
                <li>
                    <NavItem to="/all" activeStyle={activeStyle} category="all" handleClick={handleClick}>
                        All
                    </NavItem>
                </li>
                <li>
                    <NavItem to="/clothes" activeStyle={activeStyle} category="clothing" handleClick={handleClick}>
                        Clothes
                    </NavItem>
                </li>
                <li>
                    <NavItem to="/electronics" activeStyle={activeStyle} category="electronics" handleClick={handleClick}>
                        Electronics
                    </NavItem>
                </li>
                <li>
                    <NavItem to="/furnitures" activeStyle={activeStyle} category="furnitures" handleClick={handleClick}>
                        Furnitures
                    </NavItem>
                </li>
                <li>
                    <NavItem to="/toys" activeStyle={activeStyle} category="toys" handleClick={handleClick}>
                        Toys
                    </NavItem>
                </li>                
                <li>
                    <NavItem to="/others" activeStyle={activeStyle} category="jewelery" handleClick={handleClick}>
                        Others  
                    </NavItem>
                </li>

            </ul>
            <ul className='flex items-center gap-3'>
                {renderView()}
                <li className="flex items-center">
                    <ShoppingCart />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar