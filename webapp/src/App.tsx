import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Pedidos from './components/Pedidos';
import Carrito from './components/Carrito';
import Compra from './components/Compra';
import Catalogo from './components/Catalogo';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';
import DetalleProducto from './components/DetalleProducto';
import { Direccion } from './shared/shareddtypes';

function App(): JSX.Element {

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState<Direccion>({calle:'', ciudad:'', region:'', cp:''});

  return (
    <>
      <Header nombre={nombre}/>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/comprar/:id" element={<Compra direccion={direccion}/>} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path='/login' element={<Login nombre={setNombre} direccion={setDireccion}/>} />
        <Route path='/logout' element={<Logout nombre={setNombre} direeccion={setDireccion}/>} />
      </Routes>
      <Footer/>
    </> 
  );
}

export default App;
