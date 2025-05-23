import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Products from './pages/Products/Products';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import './App.scss';
import Footer from './components/footer/footer';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Caja from './pages/Caja/Caja';
import Carga from './pages/Carga/Carga'; 

// Componente wrapper para acceder al contexto del carrito
const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/caja';
  const hideFooter = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/caja';

  return (
    <div className="app">
      {!hideNavbar && <Navbar onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className="main-content-wrapper">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/category/:categoryKey" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/caja" element={<Caja />} />
        </Routes>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de la aplicación.
    // Puedes ajustar el tiempo o reemplazar esto con lógica de carga real.
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  if (appLoading) {
    return <Carga />;
  }

  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
