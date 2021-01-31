const Usuario = require("../models/usuario")


const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    //actualizar el online en la base de datos
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    //actualizar el online en la base de datos
    await usuario.save();

    return usuario;
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado
}