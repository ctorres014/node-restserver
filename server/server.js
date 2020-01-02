require('./config/config');

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.send({
            ok: false,
            message: 'No se proporciono el nombre'
        })
    } else {
        res.send({
            persona: body
        });
    }


});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
    res.send(`Hello World with post : ${id}`)
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto  ${process.env.PORT}`);

})