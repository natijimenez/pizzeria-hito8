import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // AGREGAR PRODUCTO
  const addPizza = (pizza) => {
    const existingPizza = cart.find(item => item.id === pizza.id);
    if (existingPizza) {
      setCart(cart.map(item =>
        item.id === pizza.id ? { ...item, count: item.count + 1 } : item
      ))
    } else {
      setCart([...cart, { ...pizza, count: 1 }])
    }
  }

  // ELIMINAR PRODUCTO
  const removePizza = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  // REDUCIR CANTIDAD DE PRODUCTO
  const reducePizza = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id
          ? { ...item, count: Math.max(item.count - 1, 0) }
          : item
      )
      return updatedCart.filter(item => item.count > 0)
    })
  }

  // TOTAL DE PRODUCTOS
  const totalQuantity = () => {
    return cart.reduce((total, item) => total + item.count, 0)
  }

  // TOTAL PRECIO
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0)
  }

  // Vaciar el carrito
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addPizza, removePizza, reducePizza, totalQuantity, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}