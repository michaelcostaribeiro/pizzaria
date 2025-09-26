import { useState } from 'react'
import styles from './AddFlavor.module.css'
import { db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

const AddFlavor = () => {
  // const itemRef = useRef(null)
  const [itemName, setItemName] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState(['catupiry','frango','queijo','batata','banana'])
  const [preco, setPreco] = useState('')
  const [urlImagem, setUrlImagem] = useState('')

  const [itemType, setItemType] = useState('pizza')
  
  const addIngredients = async (e) =>{
    e.preventDefault()

    setIngredients((prev) => [...prev,ingredient])
    setIngredient('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    let item={}
    if (itemType === 'pizza'){
      item = {
        itemType,
        itemName,
        ingredients,
        preco,
        urlImagem
      }
    } else{
      item = {
        itemType,
        itemName,
        preco,
        urlImagem  
      }
      
    }
    console.log(item)
    
    try {
      const docRef = await addDoc(collection(db, 'flavors'), item)
      console.log('document written with ID: ', docRef.id)
    }catch(error){
      console.error('Error adding document:', error)
    }
  }


  return (
    <div className={styles.addFlavor}>
      <form onSubmit={handleSubmit}>
        <h2>Adicione novos sabores!</h2>
        <label htmlFor='itemType'>Você deseja adicionar um sabor para pizza ou borda ?</label>
        <select  id='itemType' value={itemType} onChange={(e) => setItemType(e.target.value)} >
            <option value="pizza">Pizza</option>
            <option value="borda">Borda</option>
        </select>

        <label htmlFor='itemName'>Qual vai ser o nome do sabor da {itemType}?</label>
        <input type="text" id="itemName" value={itemName} onChange={(e)=>setItemName(e.target.value)} />

        {itemType === 'pizza' &&
          <>
            <label htmlFor='ingredients'>Quais ingredientes irão na pizza?</label>
            <div className={styles.addIngredients} >
              <input type="text" id='ingredients' value={ingredient} onChange={(e)=>setIngredient(e.target.value)} />
              <button onClick={(e) => addIngredients(e)}>Adicionar</button>
            </div>
          </>
        }

        <label htmlFor='preco' >Quanto irá custar?</label>
        <input type="number" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />

        <label htmlFor='url'>Adicione a url de uma imagem para ilustrar o sabor:</label>
        <input type="text" id="url" value={urlImagem} onChange={(e) => setUrlImagem(e.target.value)} />

        {itemType === 'pizza' &&
        <>
          <ul className={styles.flavorsList}>
            {ingredients.map((ingredient, index)=>(
              <li key={index} onClick={() =>
                setIngredients((prev) => prev.filter((_ , i)=> i !== index))
              }>{ingredient} <i  className="fa-solid fa-xmark"></i></li>
            ))
            }
          </ul>
        </>
        }
        <input type="submit" value="Adicionar sabor!" />
      </form>
    </div>
  )
}

export default AddFlavor