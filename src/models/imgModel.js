const mongoose = require("mongoose");

const imagenSchema = new mongoose.Schema({
  id_articulo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Articulo",
    required: true,
  },
  img_url: {
    type: String, // Guardaremos solo la ruta o URL del archivo.
    required: true,
  },
});

module.exports = mongoose.model("Imagen", imagenSchema);