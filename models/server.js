const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a la BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json()); //Intentará serializarlo a json cualquier petición que llegue en el body

        // Directorio público
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }


}

module.exports = Server;