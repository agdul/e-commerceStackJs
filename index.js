require('dotenv').config();
const mongoose = require('./src/db/dataBase');
const app = require('./src/app');
const PORT = process.env.PORT;

async function mainIndex() {
    try {
        await mongoose.connection;
        console.log('Conecectandose a la db ... ');
        app.listen(PORT, console.log(`Server escuchando en el puerto ${PORT}`));
    } catch (error) {
        console.error('Error al conectarse a la base de dato', error);
    }
    
}

mainIndex();





