// hooks
import { Link, NavLink } from 'react-router-dom'
import useFetchDocuments from '../../hooks/useFetchDocuments'
import { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

// css
import styles from './Editar.module.css'

const Editar = () => {
  const { fetchFlavors } = useFetchDocuments();
  const [flavors, setFlavors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)


    const loadData = async () => {
      const data = await fetchFlavors()
      setFlavors(data)
      setLoading(false)
    }
    loadData()

  }, [fetchFlavors])

  const deleteFlavor = async (flavorId) => {
    await deleteDoc(doc(db,'flavors',flavorId))
    setFlavors((prevFlavors) => prevFlavors.filter(flavor => flavor.id !== flavorId))
  }


  return loading ? <div className='loading'><p>Carregando!</p></div> : (
    <div className="container flex1 focus">
      <div className={styles.edit}>
        <h2>Adicione, edite ou remova os sabores de pizzas e bordas!</h2>
        <NavLink className={styles.addFlavorButton} to={'./AddFlavor'}>Adicionar um novo sabor!</NavLink>
        <p>Clique nos elementos abaixo para editar o sabor!</p>
        <h3>Sabores de pizza:</h3>
        <ul className={styles.itemsToEdit}>
          {flavors.map((pizzaFlavor) => {
            if (pizzaFlavor.itemType === 'pizza') {
              return <li key={pizzaFlavor.id} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={pizzaFlavor.urlImagem} alt="" />
                </div>
                <div className={styles.itemText}>
                  <h3>{pizzaFlavor.itemName}</h3>
                  <p><b>Preço: </b>{`R$${pizzaFlavor.preco}`}</p>
                  <div className={styles.itemIngredients}>
                    <b>Ingredients</b>
                    <ul>
                      {pizzaFlavor.ingredients.map((ingredient) => {
                        return <li key={ingredient}>{ingredient}</li>
                      })}
                    </ul>
                  </div>
                </div>
                <div className={styles.itemButtons}>
                  <i className="fa-solid fa-xmark" onClick={() => {
                    deleteFlavor(pizzaFlavor.id)
                  }}></i>
                  <Link to={`./${pizzaFlavor.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                </div>
              </li>
            }
            return null;
          })}
        </ul>
        <h3>Sabores de borda:</h3>
        <ul className={styles.itemsToEdit}>
          {flavors.map((bordaFlavor) => {
            if (bordaFlavor.itemType === 'borda') {
              return <li key={bordaFlavor.id} className={styles.item}>
                {/* imagem de borda não usada, caso o cliente desejar isso pode ser mudado. */}
                {/* <div className={styles.itemImg}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&s" alt="" />
                </div> */}
                <div className={styles.itemText}>
                  <h3>{bordaFlavor.itemName}</h3>
                  <p><b>Preço: </b>{`R$${bordaFlavor.preco}`}</p>
                </div>
                <div className={styles.itemButtons}>
                  <i className="fa-solid fa-xmark" onClick={() => {
                    deleteFlavor(bordaFlavor.id)
                  }}></i>
                  <Link to={`./${bordaFlavor.id}`}><i className="fa-solid fa-pen-to-square"></i></Link>

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