import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from '../context/CartContext'

const urlTipoPizza = "http://localhost:5000/api/pizzas"

const Pizza = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState(null)
    const { addPizza } = useCart()

    useEffect(() => {
        fetchPizzaById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const fetchPizzaById = async () => {
        try {
            const response = await fetch(`${urlTipoPizza}/${id}`)
            if (!response.ok) {
                throw new Error('Error en la URL')
            }
            const data = await response.json()
            console.log(data)
            setPizza(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="sectionPizzaDet">
            {pizza && (
                <div className="contenedorPizzaDet colorTextDet" key={pizza.id}>
                    <img className="pizzaDetImg colorTextDet" src={pizza.img} alt={pizza.name} />
                    <div className="pizzaDetText">
                        <h2 className="pizzaDetTitle colorTextDet">Pizza {pizza.name}</h2>
                        <p className="pizzaDetDesc colorTextDet">{pizza.desc}</p>
                        <p className="pizzaDetIngredients colorTextDet">Ingredientes:</p>
                        <ul className="pizzaDetIngredient">
                            {pizza.ingredients.map((ingredient, index) => (
                                <li className="colorTextDet" key={index}><span>🍕 </span>{ingredient}</li>
                            ))}
                        </ul>
                        <div className="pizzaDetBtns">
                            <span className="pizzaDetPrice colorTextDet">Precio: ${pizza.price}</span>
                            <button className="pizzaDetBtnAdd" onClick={() => addPizza(pizza)}>Añadir 🛒</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pizza