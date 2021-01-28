const { response } = require("express");
const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
        ok: true,
        body: req.body,
    })
}

module.exports = {
    crearUsuario,
}