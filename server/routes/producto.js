const express = require('express');
const _ = require('underscore');

const { verificarToken } = require('../middlewares/authentication');

const app = express();
// Import model
let Producto = require('../models/producto');

// ======================================
// Obtener todos los productos - 
// Populate usuario y categoria y paginar
// ======================================
app.get('/productos', verificarToken, (req, res) => {
    let desde = Number(req.query.desde);
    let limite = Number(req.query.limite);

    Producto.find({})
        .sort('nombre')
        .skip(desde)
        .limit(limite)
        .populate('usuario')
        .populate('categoria')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                productos: productosDB
            })
        });
});

// ======================================
// Obtener producto por Id
// Populate usuario y categoria y paginar
// ======================================
app.get('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    let desde = Number(req.query.desde);
    let limite = Number(req.query.limite);

    Producto.find({ _id: id })
        .skip(desde)
        .limit(limite)
        .populate('usuario')
        .populate('categoria')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'No se encontro el producto'
                    }
                });
            }

            return res.json({
                ok: true,
                producto: productoDB
            });

        });

});

// ======================================
// Buscar producto
// ======================================
app.get('/productos/buscar/:termino', verificarToken, (req, res) => {
    let termino = req.params.termino;
    // Para buscar por descripcion aplicamos una expresion regular
    let regExp = new RegExp(termino, 'i'); // 'i' indica que sea insensible a mayuscula y minuscula

    Producto.find({ nombre: regExp })
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                producto: productoDB
            })
        });
});

// ======================================
// Crear un nuevo producto
// Grabar el usuario y una categoria
// ======================================
app.post('/producto', verificarToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: Number(body.precioUni),
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria,
        usuario: req.usuario._id
    });


    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            producto: productoDB
        })
    });


});

// ======================================
// Actualizar un producto
// Grabar el usuario y una categoria
// ======================================
app.put('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,
        'nombre',
        'precio',
        'descripcion',
        'disponible',
        'categoria');

    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.send({
            ok: true,
            producto: productoDB
        });
    });
});

// ======================================
// Eliminar un producto (Lógico)
// ======================================
app.delete('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Producto.findOneAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        return res.json({
            ok: true,
            producto: productoDB
        })
    });

});

module.exports = app;