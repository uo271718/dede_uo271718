import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';
import { Producto } from '../shared/shareddtypes';
import ProductoCard from './ProductoCard';
import { ControlPointOutlined } from '@mui/icons-material';

function Catalogo(): JSX.Element {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  const realizarBusqueda = async () => {
    if (busqueda) {
      let productosfiltrados : Producto[];
      productosfiltrados = productos.filter((p)=> p.nombre.toLowerCase().includes(busqueda));
      setProductos(productosfiltrados);
    }
  }

  const refreshUserList = async () => {
    //setProductos(await getUsers());
    setProductos([{
      "id": 1,
      "nombre": "Playstation 5",
      "precio": 400.0,
      "peso": 5.0,
      "descripcion": "Consola de sobremesa para jugar a videojuegos de la marca Sony"
    },
    {
      "id": 2,
      "nombre": "XBox One Pro",
      "precio": 400.0,
      "peso": 5.0,
      "descripcion": "Consola de sobremesa para jugar a videojuegos de la marca Microsoft"
    },
    {
      "id": 3,
      "nombre": "TV LG 85432+",
      "precio": 499.99,
      "peso": 7.0,
      "descripcion": "Television de alta definicion de la marca LG"
    },
    {
      "id": 4,
      "nombre": "IPhone 13",
      "precio": 1000.99,
      "peso": 0.5,
      "descripcion": "Movil de alta gama de la marca Apple"
    },
    {
      "id": 5,
      "nombre": "S22+",
      "precio": 700.99,
      "peso": 0.5,
      "descripcion": "Movil de alta gama de la marca Samsung"
    },
    {
      "id": 6,
      "nombre": "USB Kingston 16GB",
      "precio": 5.99,
      "peso": 0.1,
      "descripcion": "Unidad USB de Kingston con 16GB de capacidad de almacenamiento"
    },
    {
      "id": 7,
      "nombre": "Cargador 25W Samsung",
      "precio": 20.0,
      "peso": 0.1,
      "descripcion": "Cargador de carga rapida de la marca Samsungcoreana Samsung"
    },
    {
      "id": 8,
      "nombre": "Raton inalambrico Corsair",
      "precio": 79.99,
      "peso": 0.1,
      "descripcion": "Raton gaming inalambrico con 30 ms de respuesta efectiva"
    },
    {
      "id": 9,
      "nombre": "Monitor AOC",
      "precio": 140.99,
      "peso": 1.2,
      "descripcion": "Monitor gaming 144Hz con 24 pulgadas, aspecto 16:9"
    },
    {
      "id": 10,
      "nombre": "Adaptador tarjeta SD",
      "precio": 4.999,
      "peso": 0.127,
      "descripcion": "Adaptor de tarjetas SD a puertos USB"
    },
    {
      "id": 12,
      "nombre": "Teclado mecanico Logitech",
      "precio": 79.999,
      "peso": 1.328,
      "descripcion": "Teclado gaming mecanico con switches marrones y teclas RGB"
    }]);
  }

  useEffect(() => {
    refreshUserList();
  }, []);

  return (
    <main>
      <Box mt='2em' sx={{display:'flex', justifyContent:'center'}}>
        <TextField placeholder='Buscar producto' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} type="text" />
        <Button className="search-btn"
        sx={{bgcolor: '#e28800',
        color: '#fff',
        height: '56px'}}
        onClick={realizarBusqueda}>
            Buscar
        </Button>
      </Box>
      {
        productos?.length > 0
          ? (
            <div className='grid'>
              {productos.map((p:Producto) => <ProductoCard producto={p}/>)}
            </div>
          ) : (
            <p>No se encontraron productos</p>
          )
      }
    </main>
  );
}

export default Catalogo;