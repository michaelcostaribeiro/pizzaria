import { Link, NavLink } from 'react-router-dom'
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


  return loading ? <div className='loading'><p>Carregando!</p></div> : (
    <div className={styles.editContainer}>
      <div className={styles.edit}>
            <h2>Adicione, edite ou remova os sabores de pizzas e bordas!</h2>
            <NavLink className={styles.addFlavorButton} to={'./AddFlavor'}>Adicionar um novo sabor!</NavLink>
            <p>Clique nos elementos abaixo para editar o sabor!</p>
            <h3>Sabores de pizza:</h3>
            <ul className={styles.itemsToEdit}>
                {flavors.map((pizzaFlavor) =>{
                  if (pizzaFlavor.itemType === 'pizza'){
                    return <li key={pizzaFlavor.id} className={styles.item}>
                      <div className={styles.itemImg}>
                        <img src={pizzaFlavor.urlImagem} alt="" />
                      </div>
                      <div className={styles.itemText}>
                        <h3>{pizzaFlavor.itemName}</h3>
                        <p><b>Preço pizza grande: </b>{`R$${pizzaFlavor.preco}`}</p>
                        <div className={styles.itemIngredients}>
                          <b>Ingredients</b>
                          <ul>
                            {pizzaFlavor.ingredients.map((ingredient)=>{
                              return <li key={ingredient}>{ingredient}</li>
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className={styles.itemButtons}>
                        <i className="fa-solid fa-xmark"></i>
                        <Link to={`./${pizzaFlavor.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                      </div>
                    </li>
                  }
                  return null;
                })}
            </ul>
            <h3>Sabores de borda:</h3>
        <ul className={styles.itemsToEdit}>
          {flavors.map((pizzaFlavor) => {
            if (pizzaFlavor.itemType === 'borda') {
              return <li key={pizzaFlavor.id} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s" alt="" />
                </div>
                <div className={styles.itemText}>
                  <h3>{pizzaFlavor.itemName}</h3>
                  <p><b>Preço pizza grande: </b>{`R$${pizzaFlavor.preco}`}</p>
                </div>
                <div className={styles.itemButtons}>
                  <i className="fa-solid fa-xmark"></i>
                  <Link to='./:id'><i className="fa-solid fa-pen-to-square"></i></Link>
                  
                </div>
              </li>
            }
            return null;
          })}
        </ul>
        </div>
        
    </div>
  )
}

export default Editar