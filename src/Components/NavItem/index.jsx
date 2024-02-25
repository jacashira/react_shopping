
import { NavLink } from  'react-router-dom'


// Cree un componente llamado NavItem que acepta las propiedades to, children y activeStyle
const NavItem = ({ to, children, activeStyle, category, handleClick }) => {

    //console.log({to},{category});

    return (
      // Use la etiqueta NavLink y le pasé las propiedades to y className
      <NavLink to={to} className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={category ? () => handleClick(category) : ''} > 
        {children}
      </NavLink>
    );
  };

export default NavItem
