import { useState, useEffect } from 'react';
import { Pedido } from '../shared/shareddtypes';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getPedidos } from '../api/api';

function Pedidos(): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const inicializarPedidos = async () => {
    setPedidos(await getPedidos(getDefaultSession().info.webId))
  }

  useEffect( () => {
    inicializarPedidos();
  }, []);
  return (
    <main>
      <TableContainer sx={{margin: '2em'}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Enviado Desde</TableCell>
            <TableCell align="right">Gastos Envío</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((p) => (
            <TableRow
              key={p.nombreProducto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {p.nombreProducto}
              </TableCell>
              <TableCell align="right">{p.cantidad}</TableCell>
              <TableCell align="right">{p.precio}€</TableCell>
              <TableCell align="right">{p.almacen}</TableCell>
              <TableCell align="right">{p.envio}€</TableCell>
              <TableCell align="right">{p.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </main>
  );
}

export default Pedidos;