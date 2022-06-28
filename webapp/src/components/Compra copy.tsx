import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Producto, Almacen } from '../shared/shareddtypes';
import { Box, Button, InputLabel, Select, MenuItem, Stack, SelectChangeEvent } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

function Compra(): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  useEffect(() => {
    getAlmacenes(id!);
    getProduct(id!);
  }, []);

  useEffect(() => {
    console.log('hi');
  });

  const { id } = useParams<string>();

  const [producto, setProducto] = useState<Producto>({} as any);
  const [almacenes, setAlmacenes] = useState<Almacen[]>({} as any);
  const [almacen, setAlmacen] = useState("");
  const [zona, setZona] = useState("");

  const seleccionarAlmacen = (e: SelectChangeEvent) => {
    let value = e.target.value as string
    setAlmacen(value.split('-')[0]);
    setZona(value.split('-')[1]);
};

  const getProduct = (idProducto: string) => setProducto({
    "id": 1,
    "nombre": "Playstation 5",
    "precio": 400.0,
    "peso": 5.0,
    "descripcion": "Consola de sobremesa para jugar a videojuegos de la marca Sony"
  });

  const getAlmacenes = (idProducto: string) => console.log('hi');setAlmacenes([{
    "idProducto": 1,
    "almacen": "Asturias",
    "cantidad": 100,
    "zona": "norte",
  },
  {
    "idProducto": 1,
    "almacen": "Madrid",
    "cantidad": 500,
    "zona": "centro",
  }]);

  return (
    <main>
      <h2>Comprando {producto.nombre}</h2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>Confirmar datos de envío</h3>
        </Box>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>{producto.nombre}</h3>
          <h4>Precio por unidad: {producto.precio}€</h4>
          <h4>Peso: {producto.peso}g</h4>
          <h4>Cantidad: {producto.peso}</h4>
          <Select
            value={almacen}
            onChange={seleccionarAlmacen}
            sx={{ width: '15em' }}
          >
            {almacenes.map((a:Almacen) => <MenuItem value={a.almacen}>
              {a.almacen + ' - ' + a.cantidad}
            </MenuItem>)}
          </Select>
        </Box>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <Button href={'/comprar/' + producto.id} sx={{
            bgcolor: '#e7a541',
            color: '#fff'
          }}>Comprar</Button>
        </Box>
      </Box>
    </main>
  );
}

export default Compra;