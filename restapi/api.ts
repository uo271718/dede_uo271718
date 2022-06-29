import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { RequestListener } from 'http';
const api: Router = express.Router()

interface User {
  name: string;
  email: string;
}

const CryptoJS = require("crypto-js");

const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  precio: Number,
  peso: Number,
  descripcion: String
})
const Producto = mongoose.model("productos", productoSchema);

const almacenSchema = new mongoose.Schema({
  idProducto: Number,
  almacen: String,
  cantidad: Number,
  zona: String
})

const Almacen = mongoose.model("almacenes", almacenSchema);

const pedidoSchema = new mongoose.Schema({
  webid: String,
  idProducto: Number,
  nombreProducto: String,
  cantidad: Number,
  precio: Number,
  almacen: String,
  envio: Number,
  estado: String
})

const Pedido = mongoose.model("pedidos", pedidoSchema);

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
  "/users/list",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send(users);
  }
);

api.get("/productos",
  async (req: Request, res: Response): Promise<Response> => { 
    const productos = await Producto.find()
    return res.status(200).send(productos);
  }
);

api.get("/productos/:id",
  async (req: Request, res: Response): Promise<Response> => { 
    let productos;
    try {
    productos = await Producto.findOne({id:req.params.id})
    } catch {

    }
    return res.status(200).send(productos);
  }
);

api.get("/almacenes/:id",
  async (req: Request, res: Response): Promise<Response> => { 
    let productos;
    try {
    productos = await Almacen.find({idProducto:req.params.id})
    } catch {
 
    }
    return res.status(200).send(productos);
  } 
);

api.get("/pedidos/:id",
  async (req: Request, res: Response): Promise<Response> => { 
    let productos = await Pedido.find({webid:req.params.id});
    return res.status(200).send(productos);
  } 
);

api.post(
  "/users/add", [
  check('name').isLength({ min: 1 }).trim().escape(),
  check('email').isEmail().normalizeEmail(),
],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = { name: name, email: email }
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post("/pedidos/add", [
  check('webid').isLength({ min: 1 }).trim().escape(),
],
async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body.webid)
  let webid = req.body.webid.toString().substring(18).split('.')[0]+req.body.webid.toString().substring(18).split('.')[1];
  let idProducto = req.body.idProducto;
  let nombreProducto = req.body.nombreProducto;
  let cantidad = req.body.cantidad;
  let precio = req.body.precio;
  let almacen = req.body.almacen;
  let envio = req.body.envio;
  let estado = req.body.estado;
  new Pedido({webid, idProducto, nombreProducto, cantidad, precio, almacen, envio, estado}).save();
  return res.sendStatus(200);
})

export default api;