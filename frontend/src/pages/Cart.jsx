import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

const Cart = () => {
  const { cart, addPizza, removePizza, reducePizza, totalQuantity, totalPrice, clearCart } = useCart()
  const { token } = useUser()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cartItems: cart, total: totalPrice() })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error al procesar el pago')
      }

      clearCart()
      setSuccessMessage('Compra realizada con éxito. ¡Gracias por tu pedido!')
    } catch (error) {
      console.error('Error en el checkout:', error.message)
      alert('Error en el checkout: ' + error.message)
    }
  }

  return (
    <div className="cart cartContainer">
      <h2 className='cartText carritoName'>Carrito de Compras</h2>

      {successMessage && <p className="cartText successMessage">{successMessage}</p>}

      {cart.length === 0 ? (
        <p className='cartText cartVacio'>El carrito está vacío</p>
      ) : (
        <div>
          <ul className='cartProductContainer'>
            {cart.map(item => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <img src={item.img} alt={item.name} style={{ width: '100px', marginRight: '15px' }} />
                <div>
                  <h4 className='cartText cartWeight'>Pizza {item.name}</h4>
                  <p className='cartText'>Precio: ${item.price}</p>
                  <p className='cartText'>Cantidad: {item.count}</p>
                  <button className='cartBtnReduce' onClick={() => reducePizza(item.id)}>-</button>
                  <button className='cartBtnAdd' onClick={() => addPizza(item)}>+</button>
                  <button className='cartBtnRemove' onClick={() => removePizza(item.id)}>Eliminar</button>
                  <hr />
                </div>
              </li>
            ))}
          </ul>
          <div className='shopContainer'>
            <h3 className='cartTotal'>Total Productos: {totalQuantity()}</h3>
            <h3 className='cartTotal'>Total Precio: ${totalPrice().toLocaleString()}</h3>
            <button className='cartBtnPay' disabled={!token || cart.length === 0} onClick={handleCheckout} > Pagar </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart