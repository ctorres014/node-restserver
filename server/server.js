require('./config/config');
// Importaciones
const express = require('express')
const mongoose = require('mongoose');

const app = express()

const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//Importamos las rutas
app.use(require('./routes/usuario'));

// Conection to server
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {

        if (err) throw err;

        console.log(`Base de datos ONLINE`);

    });

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto  ${process.env.PORT}`);

})