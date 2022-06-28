import React, { useState, useEffect } from 'react';
import { Pedido } from '../shared/shareddtypes';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';

function Pedidos(): JSX.Element {

  if (!getDefaultSession().info.isLoggedIn) {
    document.location.href = "/login";
  }

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect( () => {
    setPedidos([{
      "id": "fffff",
      "idProducto" : 1,
      "nombreProducto": "PlayStation 5",
      "cantidad":1,
      "precio": 400.0,
      "almacen": "Asturias",
      "envio": 5,
      "estado": "Recibido"
    },
    {
      "id": "fdddd",
      "idProducto" : 2,
      "nombreProducto": "XBOX",
      "cantidad":2,
      "precio": 800.0,
      "almacen": "Asturias",
      "envio": 5,
      "estado": "Enviado"
    }])
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