
import Header from "./components/Header"
import Guitarra from "./components/Guitarra"
import { useCart } from "./hooks/useCart"


function App() {
  const { data,cart,addToCart,removeFromCart,increaseQuantity,reduceQuantity,clearCart, isEmpty, cartTotal } = useCart()
    
  return (
    <>
    <Header 
        cart={cart} 
        removeFromCart={removeFromCart} 
        increaseQuantity = {increaseQuantity}
        reduceQuantity = {reduceQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
        isEmpty={isEmpty}
    />  
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
            {data.map(guitar=>{
                 
                return(
                    <Guitarra
                        guitar={guitar}
                        key={guitar.id} 
                        addToCart = {addToCart}
                        
                     />
                )
            })}

        </div>
  
    </main>
    

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
