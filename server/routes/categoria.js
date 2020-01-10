const express = require('express');
const _ = require('underscore');
const { verificarToken, verificarAdminRole } = require('../middlewares/authentication');

// Import Model
const Categoria = require('../models/categoria');

const app = express()

// ======================================
// Mostrar todas las categorias
// ======================================
app.get('/categorias', verificarToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion') // aplicamos orden
        .populate('usuario', 'nombre email') // populamos para obtener los usuarios x categoria
        .exec((err, categoriasDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                categorias: categoriasDB
            });
        });

});

// ======================================
//  Mostrar una categoria por ID
// ======================================
app.get('/categoria/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                of: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se encontró la categoría'
                }
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// ======================================
//  Crear una categoria
// ======================================
app.post('/categoria', [verificarToken, verificarAdminRole], (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// ======================================
// Actualizar la categoria
// ======================================
app.put('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion'])

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se encontró la categoría para actualizar'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});


// Solo un ADMIN puede borrar
// ======================================
// Delete categoria
// ======================================
app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'No se encontró la categoría para eliminar'
                }
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

})

module.exports = app