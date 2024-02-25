import { ChevronRightIcon } from "@heroicons/react/24/solid"
import PropTypes from 'prop-types'

const OrdersCard = props => {

    OrdersCard.propTypes = {
        totalProducts: PropTypes.node.isRequired,
        totalPrice: PropTypes.node.isRequired,

    }

    const {totalProducts, totalPrice} = props

    return (
        <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
            <div className="flex justify-between w-full">
                <p className="flex flex-col"> 
                    <span className="font-light">01.02.23</span>
                    <span>{totalProducts} articles</span>
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-medium text-lg ">${totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer"/>
                </p>
            </div>
            <p></p>
        </div>
    )
}

export default OrdersCard