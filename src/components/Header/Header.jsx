// css
import styles from './Header.module.css'

// hooks
import { useAuthValue } from '../../context/context'
import { NavLink } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication'

import bigIcon from '../../assets/big-icon-no-text.png'

const Header = () => {
  const {user} = useAuthValue();
  const {logout} = useAuthentication();

  

  return (
    <div className={styles.NavHeaderContainer}>
    <div className={styles.NavHeader}>
        <NavLink to='/'>
        <div className={styles.NavIcon}>
          <img src={bigIcon} alt="navIcon" className={styles.navIconImage}/>
            <div className={styles.NavText}>
            <p>Pensou</p>
            <p><b>Pizzou!</b></p>
          </div>
        </div></NavLink>
        {/* {user && <p>LU:{user.displayName}</p>}
          {!user && <p>UL</p>} */}
        <nav>
          <NavLink to='/cart'><i className="fa-solid fa-cart-shopping"></i></NavLink>
          <NavLink to='/menu'><i className="fa-solid fa-pizza-slice"></i></NavLink>
          {!user && <NavLink to='/login'><i className="fa-solid fa-circle-user"></i></NavLink>}
          {user && user.displayName === 'admin' && <NavLink to='/edit'><i className="fa-solid fa-file-pen"></i></NavLink>}
          {user && <NavLink to='/' onClick={logout}><i  className="fa-solid fa-right-from-bracket"></i></NavLink>}
        </nav>
    </div>
  </div>
  )
}

export default Header