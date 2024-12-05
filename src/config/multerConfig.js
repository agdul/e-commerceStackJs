const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

// Configuracion de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`; // Nombre único con extensión
        cb(null, uniqueName);
    },
});

module.exports = { multer , storage};