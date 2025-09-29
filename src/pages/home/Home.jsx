// css
import styles from './Home.module.css'

// hooks
import { NavLink } from 'react-router-dom'



const Home = () => {
  
  return (
    <div className= {styles.Home + " flex1"}>
        <div className='focus'>
          <div className={styles.HomeTitle}>
            <h1>Bateu a fome?</h1>
            <h2>Não perca tempo e peça ja a uma pizza fresquinha conosco!</h2>
          </div>
        </div>
        <NavLink to='/menu'>Peça ja uma <br /> pizza fresquinha!</NavLink>
    </div>
  )
}

export default Home