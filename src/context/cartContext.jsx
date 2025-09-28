import { useState, useContext, createContext } from "react";

const CartContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prev) => [...prev,item])
    }

    const removeFromCart = (id) => {
        setCart(() => cart.filter((cartItem)=> cartItem !== id))
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )


}

export function useCart() {
    return useContext(CartContext)
}
