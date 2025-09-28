// hooks
import { Routes,Route, BrowserRouter, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// css
import './App.css';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Editar from './pages/editar/Editar';
import EditarSabor from './pages/editarSabor/EditarSabor';
import AddFlavor from './pages/AddFlavor/AddFlavor';
import Menu from './pages/menu/Menu';
import Cart from './pages/cart/Cart';

// context
import { AuthProvider } from './context/context';
import { auth } from './firebase/config';
import { CartProvider } from './context/cartContext';


function App() {
  const [user, setUser] = useState(undefined)
  const [userAuthentication] = useState(auth)
  useEffect(() => {
    onAuthStateChanged(userAuthentication, (user) => {
      setUser(user);
    })
  },[userAuthentication])


  return (
    <>
      <AuthProvider value={{ user }}>
        <CartProvider>

        
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/menu' element={<Menu/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={user ? <Navigate to={'/'}/> : <Login />} />
              <Route path='/register' element={user ? <Navigate to={'/'}/>: <Cadastro />} />
              <Route path='/edit' element={user ? user && user.displayName === 'admin' && <Editar/> : <Navigate to={'/'}/>} />
              <Route path='/edit/:id' element={user ? user && user.displayName === 'admin' && <EditarSabor /> : <Navigate to={'/'} />} />
              <Route path='/edit/addFlavor' element={user ? user && user.displayName === 'admin' && <AddFlavor /> : <Navigate to={'/'} />} />
            </Routes>
          </BrowserRouter>
          <Footer/>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
