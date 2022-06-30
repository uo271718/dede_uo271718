import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Producto, Almacen } from '../shared/shareddtypes';
import { Box, Button, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { getProducto, getAlmacenes, addPedido } from '../api/api';

function Compra(props: any): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  const { id } = useParams<string>();

  const [producto, setProducto] = useState<Producto>({} as any);
  const [almacenes, setAlmacenes] = useState<Almacen[]>([]);
  const [almacen, setAlmacen] = useState("");
  const [zona, setZona] = useState("");
  const [coste, setCoste] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [gastosEnvio, setGastosEnvio] = useState(0);

  const MapaDePrecios = [[0, 2, 5], [5, 8, 15], [20, 25, 30]];

  const seleccionarAlmacen = (e: SelectChangeEvent) => {
    let value = e.target.value as string;
    setAlmacen(value.split('-')[0]);
    setZona(value.split('-')[1]);
    setGastosEnvio(MapaDePrecios[categoriaDistancia(value.split('-')[1])][categoriaPeso()]);
  };

  const categoriaDistancia = (zonaAlmacen: string) => {
    let zonaUsuario = "norte";
    if (zonaAlmacen === zonaUsuario) {
      return 0;
    } else if (zonaAlmacen === "canarias" || zonaAlmacen === "baleares" || zonaUsuario === "canarias" || zonaUsuario === "baleares") {
      return 2;
    } else {
      return 1;
    }
  }

  const categoriaPeso = () => {
    return producto.peso < 5 ? 0 : producto.peso < 20 ? 1 : 2;
  }

  const cambiarCantidad = (e: any) => {
    setCantidad(e.target.value as unknown as number);
    setCoste(e.target.value as unknown as number * producto.precio);
  }

  const getProduct = async (idProducto: string) => {
    setProducto(await getProducto(idProducto));
  }
  const inicializarAlmacenes = async (idProducto: string) => {
    console.log(idProducto);
    setAlmacenes(await getAlmacenes(idProducto));
  }

  const realizarCompra = async () => {
    addPedido({ webid: getDefaultSession().info.webId, idProducto: producto.id, nombreProducto: producto.nombre, cantidad: cantidad, precio: coste, almacen: almacen, envio: gastosEnvio, estado: 'En reparto' })
  }

  useEffect(() => {
    inicializarAlmacenes(id!);
    getProduct(id!);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <main>
      <h2>Comprando {producto.nombre}</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '1em' }}>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>Confirmar datos de envío</h3>
          <InputLabel>Calle</InputLabel>
          <TextField disabled value={props.direccion.calle} />
          <InputLabel>Ciudad</InputLabel>
          <TextField disabled value={props.direccion.ciudad} />
          <InputLabel>Región</InputLabel>
          <TextField disabled value={props.direccion.region} />
          <InputLabel>CP</InputLabel>
          <TextField disabled value={props.direccion.cp} />
        </Box>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>{producto.nombre}</h3>
          <h4>Precio por unidad: {producto.precio}€</h4>
          <h4>Peso: {producto.peso}kg</h4>
          <InputLabel>Unidades</InputLabel>
          <TextField
            type='number'
            inputProps={{ min: 1 }}
            onChange={cambiarCantidad}
            sx={{ width: '15em' }}
          />
          <InputLabel>Enviado desde</InputLabel>
          <Select
            value={almacen + '-' + zona}
            onChange={seleccionarAlmacen}
            sx={{ width: '15em' }}
          >
            {
              almacenes.length > 0 ? (almacenes.map((a: Almacen) => <MenuItem value={a.almacen + '-' + a.zona}>
                {a.almacen + ' - ' + a.cantidad + ' disponibles'}
              </MenuItem>)
              ) : (
                <MenuItem value={'-'}>Sin stock
                </MenuItem>)
            }
          </Select>
        </Box>

        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em', display: 'flex', flexDirection: 'column' }}>
          <h3>Resumen de costes</h3>
          <InputLabel>Coste</InputLabel>
          <TextField disabled value={coste} />
          <InputLabel>Gastos de envío</InputLabel>
          <TextField disabled value={gastosEnvio} />
          <InputLabel>Total</InputLabel>
          <TextField disabled value={coste + gastosEnvio} />
          <Link to='/pedidos'>
            <Button sx={{
              bgcolor: '#e7a541',
              color: '#fff',
              marginTop: 'auto'
            }}
              onClick={realizarCompra}
              disabled={almacen === '' || cantidad < 1}>Comprar</Button></Link>
        </Box>
      </Box>
    </main>
  );
}

export default Compra;