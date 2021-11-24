const express = require('express');
const mongoose = require("mongoose");
const routes = require('./routes'); // No es necesario el nombre del archivo ya que se llama index, JavaScript busca los archivos index
// const bodyParser = require('body-parser'); // Deprecado para express v4+
const cors = require('cors');

// Crear servidor
const server = express();

// Habilitar Cors
const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin : (origin, callback) => {
        const existe = whiteList.some( dominio => dominio === origin );
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
// server.use(cors(corsOptions)); // Para permitir solo accesos de una lista de dominios
server.use(cors()); // Para permitir acceso a todo el mundo 

// Conectar con MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', { // En local: mongodb://localhost/<database>
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

// Habilitar body-parser
server.use(express.json());
server.use(express.urlencoded({extended: true}))
// server.use(bodyParser.json()); // Deprecado para express v4+
// server.use(bodyParser.urlencoded({ extended: true })) // Deprecado para express v4+

// Habilitar Routing
server.use('/', routes());

// Elegir Puerto y arrancar servidor
server.listen(4000, () => {
    console.log('Servidor funcionando...');
});