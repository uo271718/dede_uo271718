import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Producto, Almacen } from '../shared/shareddtypes';
import { Box, Button, InputLabel, Select, MenuItem, Stack, SelectChangeEvent, TextField } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

function Compra(props: any): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  const { id } = useParams<string>();

  const prueba = [{
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
  }];

  const [producto, setProducto] = useState<Producto>({} as any);
  const [almacenes, setAlmacenes] = useState<Almacen[]>({} as any);
  const [almacen, setAlmacen] = useState("");
  const [zona, setZona] = useState("");
  const [coste, setCoste] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [gastosEnvio, setGastosEnvio] = useState(0);

  let MapaDePrecios = [[0, 2, 5], [5, 8, 15], [20, 25, 30]];
  let categoriaPeso: number = 0;
  let categoriaDistancia = 0;

  const seleccionarAlmacen = (e: SelectChangeEvent) => {
    let value = e.target.value as string;
    setAlmacen(value.split('-')[0]);
    setZona(value.split('-')[1]);
    categoriaDistancia = calcularCatDistancia();
    setGastosEnvio(MapaDePrecios[categoriaDistancia][categoriaPeso]);
    console.log(gastosEnvio)
  };

  const calcularCatDistancia = () => {
    return 1;
  }

  const cambiarCantidad = (e:any) => {
    setCantidad(e.target.value as unknown as number);
    setCoste(e.target.value as unknown as number * producto.precio);
  }

  const getProduct = (idProducto: string) => {
    setProducto({
      "id": 1,
      "nombre": "Playstation 5",
      "precio": 400.0,
      "peso": 5.0,
      "descripcion": "Consola de sobremesa para jugar a videojuegos de la marca Sony"
    });
  }
  const getAlmacenes = (idProducto: string) => setAlmacenes([{
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
  useEffect(() => {
    getProduct(id!);
    getAlmacenes(id!);
    categoriaPeso = producto.peso < 5 ? 0 : producto.peso < 20 ? 1 : 2;
    setCoste(producto.precio);
  }, []);


  return (
    <main>
      <h2>Comprando {producto.nombre}</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '1em' }}>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>Confirmar datos de envío</h3>
          <InputLabel>Calle</InputLabel>
          <TextField disabled value={props.direccion.calle}/>
          <InputLabel>Ciudad</InputLabel>
          <TextField disabled value={props.direccion.ciudad}/>
          <InputLabel>Región</InputLabel>
          <TextField disabled value={props.direccion.region}/>
          <InputLabel>CP</InputLabel>
          <TextField disabled value={props.direccion.cp}/>
        </Box>
        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em' }}>
          <h3>{producto.nombre}</h3>
          <h4>Precio por unidad: {producto.precio}€</h4>
          <h4>Peso: {producto.peso}kg</h4>
          <InputLabel>Unidades</InputLabel>
          <TextField
          type='number'
          defaultValue={1}
          inputProps={{min:1}}
            onChange={cambiarCantidad}
            sx={{ width: '15em' }}
            placeholder='1'
          />
          <InputLabel>Enviado desde</InputLabel>
          <Select
            value={almacen + '-' + zona}
            onChange={seleccionarAlmacen}
            sx={{ width: '15em' }}
          >
            {prueba.map((a: Almacen) => <MenuItem value={a.almacen + '-' + a.zona}>
              {a.almacen + ' - ' + a.cantidad + ' disponibles'}
            </MenuItem>)}
          </Select>
        </Box>

        <Box sx={{ border: 'solid 2px #f0c482', padding: '1em', margin: '1em', borderRadius: '1em', display:'flex', flexDirection:'column' }}>
          <h3>Resumen de costes</h3>
          <InputLabel>Coste</InputLabel>
          <TextField disabled value={coste}/>
          <InputLabel>Gastos de envío</InputLabel>
          <TextField disabled value={gastosEnvio}/>
          <InputLabel>Total</InputLabel>
          <TextField disabled  value={coste + gastosEnvio}/>
          <Button sx={{
            bgcolor: '#e7a541',
            color: '#fff',
            marginTop: 'auto'
          }}
          disabled={almacen==='' || cantidad < 1}>Comprar</Button>
        </Box>
      </Box>
    </main>
  );
}

export default Compra;