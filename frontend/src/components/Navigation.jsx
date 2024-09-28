import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

const Navigation = () => {
  const { totalPrice } = useCart()
  const { token, logout } = useUser()
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "nav-btn")

  return (
    <Navbar expand="lg" className="navigation-bar sticky-top" bg="dark" data-bs-theme="dark" >
      <Container fluid>
        <Navbar.Brand href="#">Pizzería Mamma Mía</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink to="/" className={setActiveClass} >🍕 Home </NavLink>
            {token ? (
              <>
                <NavLink to="/profile" className={setActiveClass}>🔓 Profile</NavLink>
                <a className={setActiveClass} onClick={logout} style={{ cursor: "pointer" }}>🔓 Logout</a>
              </>
            ) : (
              <>
                <NavLink to="/login" className={setActiveClass}>🔐 Login</NavLink>
                <NavLink to="/register" className={setActiveClass} >🔐 Register</NavLink>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <NavLink to="/cart" className='nav-btn-total'>🛒 Total: ${totalPrice().toLocaleString()}</NavLink>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation