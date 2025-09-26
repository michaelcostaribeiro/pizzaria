import { useState, useRef } from 'react'
import styles from './AddFlavor.module.css'

const AddFlavor = () => {
  const itemRef = useRef(null)
  const [nomePizza, setNomePizza] = useState('')
  const [ingredientes, setIngredients] = useState([])
  const [preco, setPreco] = useState('')
  const [urlImagem, setUrlImagem] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(itemRef.current.value)
  }
  return (
    <div className={styles.addFlavor}>
      <form onSubmit={handleSubmit}>
        <h2>Adicione novos sabores!</h2>
        <label>Você deseja adicionar um sabor para pizza ou borda ?</label>
        <select ref={itemRef} >
            <option value="pizza">Pizza</option>
            <option value="borda">Borda</option>
        </select>

        <label>Qual vai ser o nome do sabor da pizza?</label>
        <input type="text" id="" />

        <label >Quais ingredientes irão na pizza?</label>
        <div className={styles.addIngredients}>
          <input type="text" id="" />
          <button>Adicionar</button>
        </div>

        <label >Quanto irá custar?</label>
        <input type="number" id="" />

        <label >Adicione a url de uma imagem para ilustrar o sabor:</label>
        <input type="text" id="" />
        <input type="submit" value="Adicionar sabor!" />
      </form>
    </div>
  )
}

export default AddFlavor