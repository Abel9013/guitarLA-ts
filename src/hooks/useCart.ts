import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { Guitar,cartItem } from "../types"
export const useCart = ()=>{

  const initialCart = () : cartItem[] =>{
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const MAX_ITEMS = 5
  const MIN_ITEM = 1
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])
  function addToCart(item:Guitar) {
    const itemExists = cart.findIndex(guitar=>guitar.id === item.id)
    
    if(itemExists>=0) { 
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart) 
    } else {
        const newItem : cartItem = {...item, quantity : 1}
        setCart([...cart,newItem])
    }
    // saveLocalStorage()
  }
  function removeFromCart(id :  Guitar["id"] ){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id ))
  }
  function reduceQuantity(id :  Guitar["id"] ){
    const updatedCart = cart.map( item =>{
        if(item.id===id && item.quantity > MIN_ITEM){
            return {
                ...item,
                quantity: item.quantity -1 
            }    
        }
        return item
    })
    setCart(updatedCart)
  }
  function increaseQuantity (id :  Guitar["id"]) {
    const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return{
                ...item,
                quantity: item.quantity + 1

            }
        }
        return item
    } )
    setCart(updatedCart)
  }
  function clearCart(){
    setCart([])
  }
  // state derivado 
  const isEmpty = useMemo(()=> cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.price * item.quantity), 0 ),[cart])
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    reduceQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
} 
