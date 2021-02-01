const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['x-token']);

    //verificacion de la autenticacion
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    //console.log(valido, uid);
    if(!valido) {
        return client.disconnect();
    }
    //console.log('cliente autenticado');
    usuarioConectado(uid);

    //ingresar al usuario en una sala especifica
    // sala global, client.id
    client.join(uid);

    //escuchamos del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        //grabar en mensaje en la base de datos
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });
    


    client.on('disconnect', () => {
        //console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    }); */


});
