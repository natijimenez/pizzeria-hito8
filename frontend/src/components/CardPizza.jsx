/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useCart } from '../context/CartContext'

const CardPizza = ({ pizza }) => {
  const { addPizza } = useCart()
  const { img, name, ingredients, price, id } = pizza

  return (
    <Card style={{ width: '18rem' }} className='item'>
      <Card.Img variant="top" src={img} alt={name} />
      <ListGroup className="list-group-flush pizzaCard">
        <ListGroup.Item className='card-name'>Pizza {name}</ListGroup.Item>
        <ListGroup.Item className="card-title-ingredients">
          Ingredientes:<br />
          <ul className='card-container-ingredients'>
            <span>🍕</span>
            <li className="card-ingredients">
              {ingredients.map((ingredient, index) => (
                <span key={index} className="card-ingredients">
                  {ingredient}
                  {index < ingredients.length - 1 && ', '}
                </span>
              ))}
            </li>
          </ul>
        </ListGroup.Item>
        <ListGroup.Item className="card-price">Precio: <span className="card-price">${price.toLocaleString()}</span></ListGroup.Item>
      </ListGroup>
      <Card.Body className='card-btns-container'>
        <Link to={`/pizza/${id}`} className="card-link card-btn-more">Ver más 👀</Link>
        <a className="card-link card-btn-add" onClick={() => addPizza(pizza)}>Añadir 🛒</a>
      </Card.Body>
    </Card>
  )
}

export default CardPizza