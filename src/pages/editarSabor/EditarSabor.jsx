import { useParams } from "react-router-dom"
import useFetchDocument from "../../hooks/useFetchDocument"
import styles from './EditarSabor.module.css'
import { useEffect, useState } from "react"


const EditarSabor = () => {
    const {fetchFlavor} = useFetchDocument()
    const {id} = useParams()
    const [itemInicialState, setItemInicialState] = useState('')

    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState('')
    const [preco, setPreco] = useState('')
    const [urlImagem, setUrlImagem] = useState('')
    const [ingredients, setIngredients] = useState('')
    
    
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchFlavor(id)
            setItemInicialState(data)

            setItemType(data.itemType)
            setItemName(data.itemName)
            setPreco(data.preco)
            setUrlImagem(data.urlImagem)
            if(data.itemType === 'pizza'){
                setIngredients(data.ingredients)
            }
        }
        loadData()
    }, [fetchFlavor, id])


    const handleSubmit = () =>{
        console.log('hi')
    }
  return (
      <div className={styles.editarSabor + " flex1"}>
          <p>Editando o valor de {itemInicialState.itemName}({itemInicialState.itemType})</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="itemName">Nome:</label>
              <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />

              {itemType === 'pizza' && <p>O item é uma pizza!</p>}
          </form>
      </div>
  )
}

export default EditarSabor