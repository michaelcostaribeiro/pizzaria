import { useEffect, useState } from "react"
import useFetchDocuments from "../../hooks/useFetchDocuments"
import { useCart } from "../../context/cartContext"

const MenuList = ({tamanho, setTamanho}) => {
    const {fetchFlavors} = useFetchDocuments()
    const [pizzaList, setPizzaList] = useState([])
    const [loading, setLoading] = useState(true)

    const [primeiraMetade, setPrimeiraMetade] = useState('')
    const [segundaMetade, setSegundaMetade] = useState('')
    const [borda, setBorda] = useState('')

    const {addToCart} = useCart()


    useEffect(() => {
        setLoading(true)
        const loadData = async () => {
            const data = await fetchFlavors()
            setPizzaList(data)
            setLoading(false)
        }
        loadData()
    }, [fetchFlavors])

    const handleChange = ([order,flavorObject]) => {
        const chosenFlavor = [order, flavorObject]
        switch(chosenFlavor[0]) {
            case "primeiraMetade":
                console.log(`primeira metade: ${chosenFlavor[1].itemName}`)
                setPrimeiraMetade(chosenFlavor[1])
                break
            case "segundaMetade":
                console.log(`segunda metade: ${chosenFlavor[1].itemName}`)
                setSegundaMetade(chosenFlavor[1])
                break
                case "borda":
                console.log(`borda: ${chosenFlavor[1].itemName}`)
                setBorda(chosenFlavor[1])
                break
            default:
        }

    }

    const handleSubmit = (e, tamanho) =>{
        e.preventDefault()
        console.log(tamanho)

        switch(tamanho){
            case 'grande':
                console.log('pizza grande escolhida!')
                break
            case 'brotinho':
                console.log('pizza brotinho escolhida')
                break
            default:
        }

        const pedido = {
            id: Math.floor(Math.random()*100_000),
            tamanho,
            primeiraMetade,
            segundaMetade,
            borda
        }
        console.log(pedido)

        addToCart(pedido)

        setTamanho(null)
    }

  return (
    loading ? <div className="loading"><p>Carregando!</p></div>:<div>
        <h1>Monte sua pizza!</h1>
        {/* pizzas rendering */}
        
        <form onSubmit={(e) => handleSubmit(e,tamanho)}>
            <fieldset>
                <legend>Selecione a primeira metade da pizza:</legend>
                {pizzaList.map((p) =>{
                    if(p.itemType === 'pizza'){
                        return (
                            <div key={p.id}>
                                <input type="radio" name='primeiraMetade' id={`primeiraMetade,${p.id}`} value={p.id} onChange={() => handleChange(['primeiraMetade', p])} />
                                <label htmlFor={`primeiraMetade,${p.id}`}>{p.itemName}</label>
                            </div>
                        )
                    }else return null
                })}
            </fieldset>
            <fieldset>
                <legend>Selecione a segunda metade da pizza:</legend>
                {pizzaList.map((p) =>{
                    if(p.itemType === 'pizza'){
                        return (
                            <div key={p.id}>
                                <input type="radio" name='segundaMetade' id={`segundaMetade,${p.id}`} value={p.id} onChange={() => handleChange(['segundaMetade', p])} />
                                <label htmlFor={`segundaMetade,${p.id}`}>{p.itemName}</label>
                            </div>
                        )
                    }else return null
                })}
            </fieldset>
            <fieldset>
                <legend>Escolha a borda:</legend>
                {pizzaList.map((b) => {
                    if(b.itemType === 'borda'){
                        return <div key={b.id}>
                            <input type="radio" name="borda" id={`borda,${b.id}`} value={b.id} onChange={() => handleChange(['borda',b])} />
                            <label htmlFor={`borda,${b.id}`}>{b.itemName}</label>
                        </div>
                    } else return null
                })
                }
            </fieldset>

              <input type="submit" value="Comprar" />
        </form>
    </div>
  )
}

export default MenuList