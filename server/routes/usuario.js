const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');
// Import Model
const Usuario = require('../models/usuario')
const { verificarToken, verificarAdminRole } = require('../middlewares/authentication');

const app = express()

app.get('/usuarios', verificarToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 0;

    Usuario.find({ estado: true }, 'nombre email rol estado google img')
        .skip(desde) // Salta un numero especifico de regostros (Paginacion)
        .limit(limite) // Regresa la cantidad de registros que se indiquen (Paginacion)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // Obtenemos la cantidad de registros
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                })
            });

        });
});

app.post('/usuario', [verificarToken, verificarAdminRole], (req, res) => {
    let body = req.body;

    // Creamos una instancia de usuario y le 
    // asignamos los valores que vienen en el body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Guardamos en la BD de Mongo
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usaurio: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;
    // Usamos la funcion pick que nos retorna una copia del objeto
    // con las propiedades que nosotros necesitamos
    let body = _.pick(req.body, ['nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.send({
            ok: true,
            usaurio: usuarioDB
        });
    });



});

app.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;

    //  Usuario.findByIdAndRemove - Elimina el usuario fisicamente
    Usuario.findOneAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usaurio: usuarioDelete
        });

    });

});

module.exports = app;