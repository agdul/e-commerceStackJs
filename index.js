require('dotenv').config();
const mongoose = require('./src/db/dataBase');
const app = require('./src/app');
const PORT = process.env.PORT;

async function mainIndex() {
    try {
        await mongoose.connection;
        app.listen(PORT, console.log(`✅ [Server Listening] ON PORT: ${PORT}`));
    } catch (error) {
        console.error('Error al conectarse a la base de dato', error);
    }
    
}

mainIndex();





