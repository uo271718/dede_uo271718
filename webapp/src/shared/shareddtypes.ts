export type Direccion = {
  calle: string;
  ciudad: string;
  region: string;
  cp: string;
}

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  peso: number;
  descripcion: string;
}

export type Pedido = {
  webid: string;
  idProducto: number;
  nombreProducto: string,
  cantidad: number,
  precio: number,
  almacen: string,
  envio: number, 
  estado: string 
}

export type Almacen = {
  idProducto: number;
  almacen: string;
  cantidad: number;
  zona: string;
}