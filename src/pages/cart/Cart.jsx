import { useEffect, useState } from 'react'
import { useCart } from '../../context/cartContext'
import styles from './Cart.module.css'

const Cart = () => {
    const {cart} = useCart()
    const [precoTotal, setPrecoTotal] = useState()

    const calcPrecoItem = (item) =>{
        const primeiraMetade = parseFloat(item.primeiraMetade.preco) / 2
        const segundaMetade = parseFloat(item.segundaMetade.preco) / 2
        const borda = parseFloat(item.borda.preco)
        // console.log(borda + primeiraMetade + segundaMetade)
        const total = primeiraMetade + segundaMetade + borda
        if(item.tamanho === 'grande'){
            return total 
        }else{
            return (total/100) * 75
        }
    }

    const somatotal = () =>{
        setPrecoTotal(precoTotal + 5)
    }


    useEffect(()=>{
        const calcTotal = () => {
            const total = cart.reduce((totalBuy,item) => totalBuy + calcPrecoItem(item),0);
            setPrecoTotal(total)
        }
        calcTotal()
    },[cart])
    


  return (
      <div className={styles.Cart + " flex1"}>
        <h1>Itens no carrinho: </h1>
        <ul>
            {cart.map((i)=>{
                return <li key={i.id}>
                    <div className={styles.itemBlock}>
                        <div>
                            <h3>Item número: {i.id} </h3>
                            <p>Pizza: {i.tamanho}</p>
                            <p>1/2 {i.primeiraMetade.itemName} 1/2 {i.segundaMetade.itemName} </p>
                            <p>Borda: {i.borda.itemName}</p>
                            <p>Preço final: R$ {calcPrecoItem(i)}</p>
                        </div>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </li>
            })}
            <hr />
        </ul>
        <div className={styles.totalBlock}>
            <p>Preço total da compra: R$ {precoTotal}</p>
            <button onClick={(e) => {
                e.preventDefault()
                  somatotal()
                }}>Finalizar Compra</button>
        </div>


      </div>
  )
}

export default Cart