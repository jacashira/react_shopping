import PropTypes from 'prop-types'

const Layout = ({ children }) => {
    Layout.propTypes = {
        children: PropTypes.node.isRequired,
    }
    
    return(
        <div className="flex flex-col w-full items-center mt-28">
            {children}
        </div>
    )
}

export default Layout