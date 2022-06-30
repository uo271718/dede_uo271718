import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})

describe('product ', () => {
    /**
     * Test that we can list products without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/productos");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can find a product without any error.
     */
     it('can be found',async () => {
        const response:Response = await request(app).get("/api/productos/1");
        expect(response.statusCode).toBe(200);
    });

    
});