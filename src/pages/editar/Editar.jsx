import { NavLink } from 'react-router-dom'
import styles from './Editar.module.css'
import useFetchDocuments from '../../hooks/useFetchDocuments'
import { useEffect, useState } from 'react';

const Editar = () => {
  const {fetchFlavors} = useFetchDocuments();
  const [flavors, setFlavors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    setLoading(true)


    const loadData = async () => {
      const data = await fetchFlavors()
      setFlavors(data)
      setLoading(false)
    }
    loadData()

  }, [fetchFlavors])
  console.log(flavors)


  return loading ? <div className='loading'><p>Carregando!</p></div> : (
    <div className={styles.edit}>
        <div>
            <h2>Adicione, edite ou remova os sabores de pizzas e bordas!</h2>
            <NavLink to={'./AddFlavor'}>Adicionar um novo sabor!</NavLink>
            <p>Clique nos elementos abaixo para editar o sabor!</p>
            <h3>Sabores de pizza:</h3>
            <ul>
                {flavors.map((pizzaFlavor) =>{
                  if (pizzaFlavor.itemType === 'pizza'){
                    return <li key={pizzaFlavor.id}>{pizzaFlavor.itemName}</li>
                  }
                  return null;
                })}
            </ul>
            <h3>Sabores de borda:</h3>
            <ul>
                {flavors.map((borderFlavor) => {
                  if (borderFlavor.itemType === 'borda') {
                    return <li key={borderFlavor.id}>{borderFlavor.itemName}</li>
                  }
                  return null;
                })}
            </ul>
        </div>
        
    </div>
  )
}

export default Editar