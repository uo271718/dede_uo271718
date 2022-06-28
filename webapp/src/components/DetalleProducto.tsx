import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Producto } from '../shared/shareddtypes';

function DetalleProducto(): JSX.Element {

  const { id } = useParams<string>();

  const [producto, setProducto] = useState<Producto>({} as any);

  const getProduct = (idProducto:string) => setProducto({
    "id": 1,
    "nombre": idProducto,
    "precio": 400.0,
    "peso": 5.0,
    "descripcion": "Consola de sobremesa para jugar a videojuegos de la marca Sony"
  });
  useEffect(() => {
    getProduct(id!);
  }, []);


  return (
    <main>
      <h2>{producto.nombre}</h2>
      <img src={"/productos/"+ id+".png"} alt='logo' />
      <h3>{producto.nombre}€</h3>
      <h3>{producto.peso}g</h3>
      <p>{producto.descripcion}</p>
      <Button sx={{
        bgcolor: '#fff',
        color: '#e7a541'
      }}>Añadir a la cesta</Button>
      <Link to={'/comprar/' + producto.id}>
      <Button sx={{
        bgcolor: '#e7a541',
        color: '#fff'
      }}>Comprar</Button></Link>
    </main>
  );
}

export default DetalleProducto;