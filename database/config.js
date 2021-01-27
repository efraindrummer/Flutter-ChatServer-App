const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.DATABASE_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('db online');

    } catch (error) {
        
        console.log(error);
        throw new Error('Error en la base de datos');
    
    }
}

module.exports = {
    dbConnection,
}