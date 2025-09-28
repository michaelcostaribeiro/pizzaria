import { useEffect, useState } from "react"
import useFetchDocuments from "../../hooks/useFetchDocuments"
import { useCart } from "../../context/cartContext"
import styles from './MenuList.module.css'

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

    const formattingPrice = (price) =>{
        let precoFormatado = Number(price).toFixed(2)
        let arrayPreco = precoFormatado.split('.')
        return `R$${arrayPreco.join(',') }`
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
    loading ? <div className="loading"><p>Carregando!</p></div>:(
    <div className={styles.MenuList}>
        <h1>Menu</h1>
        <h2>Monte sua pizza!</h2>
        {/* pizzas rendering */}
        
        <form onSubmit={(e) => handleSubmit(e,tamanho)}>
            <table>
                <caption>Selecione a primeira metade:</caption>
                
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Sabor</th>
                        <th scope="col">Preço</th>
                    </tr>
                </thead>
                <tbody>

                {pizzaList.map((p) =>{
                    if(p.itemType === 'pizza'){
                        return (
                            <tr key={p.id}>
                                <td><input type="radio" name='primeiraMetade' id={`primeiraMetade,${p.id}`} value={p.id} onChange={() => handleChange(['primeiraMetade', p])} /></td>
                                    <td><label htmlFor={`primeiraMetade,${p.id}`}>{p.itemName}</label></td>
                                <td><label htmlFor={`primeiraMetade,${p.id}`}>{formattingPrice(p.preco)}</label></td>
                            </tr>
                        )
                    }else return null
                })}
                      </tbody>
            </table>
            <table>
                <caption>Selecione a segunda metade:</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sabor</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzaList.map((p) =>{
                        if(p.itemType === 'pizza'){
                            return (
                                <tr key={p.id}>
                                    <td><input type="radio" name='segundaMetade' id={`segundaMetade,${p.id}`} value={p.id} onChange={() => handleChange(['segundaMetade', p])} /></td>
                                    <td><label htmlFor={`segundaMetade,${p.id}`}>{p.itemName}</label></td>
                                    <td><label htmlFor={`segundaMetade,${p.id}`}>{formattingPrice(p.preco)}</label></td>
                                    
                                </tr>
                            )
                        }else return null
                    })}
                </tbody>
            </table>
            <table>
                <caption>Escolha a borda:</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sabor</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                {pizzaList.map((b) => {
                    if(b.itemType === 'borda'){
                        return <tr key={b.id}>
                            <td><input type="radio" name="borda" id={`borda,${b.id}`} value={b.id} onChange={() => handleChange(['borda',b])} /></td>
                            <td><label htmlFor={`borda,${b.id}`}>{b.itemName}</label></td>
                            <td><label htmlFor={`borda,${b.id}`}>{formattingPrice(b.preco)}</label></td>
                        </tr>
                    } else return null
                })
                }
                </tbody>
            </table>

              <input type="submit" value="Comprar" />
        </form>
    </div>)
  )
}

export default MenuList