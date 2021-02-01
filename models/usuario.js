const { JsonWebTokenError } = require('jsonwebtoken');
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
    //el object se llama cuando lo enviamos al json para mantener le estado actual de la aplicacion
});

module.exports = model('Usuario', UsuarioSchema);