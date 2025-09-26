// hooks
import { Routes,Route, BrowserRouter} from 'react-router-dom'
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

// context
import { AuthProvider } from './context/context';
import { auth } from './firebase/config';
import Editar from './pages/editar/Editar';
import AddFlavor from './pages/AddFlavor/AddFlavor';


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
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Cadastro/>} />
            <Route path='/edit' element={<Editar/>} />
            <Route path='/edit/addFlavor' element={<AddFlavor/>} />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
