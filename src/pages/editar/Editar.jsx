import { NavLink } from 'react-router-dom'
import styles from './Editar.module.css'

const Editar = () => {
  return (
    <div className={styles.edit}>
        <div>
            <h2>Adicione, edite ou remova os sabores de pizzas e bordas!</h2>
            <NavLink to={'./AddFlavor'}>Adicionar um novo sabor!</NavLink>
            <p>Clique nos elementos abaixo para editar o sabor!</p>
            <h3>Sabores de pizza:</h3>
            <ul>
                <li>Pizza - exemplo 1</li>
                <li>Pizza - exemplo 2</li>
                <li>Pizza - exemplo 3</li>
            </ul>
            <h3>Sabores de borda:</h3>
            <ul>
                <li>Borda - exemplo 1</li>
                <li>Borda - exemplo 2</li>
                <li>Borda - exemplo 3</li>
            </ul>
        </div>
        
    </div>
  )
}

export default Editar