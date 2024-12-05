const multer = require('multer');

const storage = multer.memoryStorage();

const uploadImgMiddleware = multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // Límite de 2MB
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, JPG).'));
      } else {
        cb(null, true);
      }
    },
  });

module.exports = { uploadImgMiddleware };