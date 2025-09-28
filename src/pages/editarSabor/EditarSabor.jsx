// hooks
import { useNavigate, useParams } from "react-router-dom"
import useFetchDocument from "../../hooks/useFetchDocument"
import { useEffect, useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"

// css
import styles from './EditarSabor.module.css'



const EditarSabor = () => {
    const { fetchFlavor } = useFetchDocument()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [itemInicialState, setItemInicialState] = useState('')

    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState('')
    const [preco, setPreco] = useState('')
    const [urlImagem, setUrlImagem] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [ingredient, setIngredient] = useState('')

    const addIngredients = async (e) => {
        e.preventDefault()

        setIngredients((prev) => [...prev, ingredient])
        setIngredient('')
    }

    const navigate = useNavigate('')


    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const data = await fetchFlavor(id)
            setItemInicialState(data)

            setItemType(data.itemType)
            setItemName(data.itemName)
            setPreco(data.preco)
            setUrlImagem(data.urlImagem)
            if (data.itemType === 'pizza') {
                setIngredients(data.ingredients)
            }
            setLoading(false)
        }
        loadData()
    }, [fetchFlavor, id])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const docRef = doc(db, 'flavors', id);
        if (itemType === 'pizza') {
            await updateDoc(docRef, {
                itemName,
                itemType,
                preco,
                urlImagem,
                ingredients
            })
        } else {
            await updateDoc(docRef, {
                itemName,
                itemType,
                preco,
                urlImagem
            })

        }

        navigate('/edit')
    }
    return loading ? <div className='loading'><p>Carregando!</p></div> : (
        <div className={styles.editarSabor + " flex1"}>
            <p>Editando o valor de {itemInicialState.itemName}({itemInicialState.itemType})</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="itemName">Nome:</label>
                <input autoComplete="off" type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />

                {itemType === 'pizza' &&
                    <>
                        <label htmlFor='ingredients'>Quais ingredientes irão na pizza?</label>
                        <div className={styles.addIngredients} >
                            <input autoComplete="off" type="text" id='ingredients' value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                            <button onClick={(e) => addIngredients(e)}>Adicionar</button>
                        </div>
                    </>
                }
                <label htmlFor="preco">Preco:</label>
                <input autoComplete="off" type="number" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />

                <label htmlFor="urlImagem">URL da Imagem:</label>
                <input autoComplete="off" type="text" id="urlImagem" value={urlImagem} onChange={(e) => setUrlImagem(e.target.value)} />


                {itemType === 'pizza' &&
                    <>
                        <ul className={styles.flavorsList}>
                            {ingredients.map((ingredient, index) => (
                                <li key={index} onClick={() =>
                                    setIngredients((prev) => prev.filter((_, i) => i !== index))
                                }>{ingredient} <i className="fa-solid fa-xmark"></i></li>
                            ))
                            }
                        </ul>
                    </>
                }
                <input type="submit" value="Editar" />
            </form>
        </div>
    )
}

export default EditarSabor