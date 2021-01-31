const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                //no se pudo crear el token
                reject('No se pudo generar el jwt')
            }else{
                //token
                resolve(token)
            }
        })
    })
}

const comprobarJWT = ( token = '') => {

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //si se conecta me regresa como segundo argumento el id del usuario
        return [true, uid];

    } catch (error) {

        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}