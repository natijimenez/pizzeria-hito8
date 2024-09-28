import { Route, Routes, Navigate } from "react-router-dom"
import { useUser } from './context/UserContext'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Pizza from "./pages/Pizza"
import Home from './pages/Home'
import Cart from './pages/Cart'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'



function App() {
  const { token } = useUser()

  return (
    <CartProvider>
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  );
}

export default App
