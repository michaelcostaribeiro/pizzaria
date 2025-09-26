// css
import { NavLink } from 'react-router-dom'
import styles from './Home.module.css'


const Home = () => {
  return (
    <div className= {styles.Home + " flex1"}>
        <NavLink>Peça ja uma pizza fresquinha!</NavLink>
    </div>
  )
}

export default Home