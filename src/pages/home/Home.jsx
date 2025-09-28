// css
import styles from './Home.module.css'

// hooks
import { NavLink } from 'react-router-dom'



const Home = () => {
  
  return (
    <div className= {styles.Home + " flex1"}>
        <NavLink to='/menu'>Peça ja uma pizza fresquinha!</NavLink>
    </div>
  )
}

export default Home