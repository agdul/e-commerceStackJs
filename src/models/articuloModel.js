const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({
  cod_articulo: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
  },
  nombre_articulo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  descripcion_articulo: {
    type: String,
    minlength: 5,
    maxlength: 500,
  },
  precio_articulo: {
    type: Number,
    required: true,
    min: 0,
  },
  stock_articulo: {
    type: Number,
    required: true, // Opcional, según tus necesidades
    default: 0, // Define un valor inicial si lo deseas
    min: 0,
  },
},
{
    collection: 'articulos'
});

module.exports = mongoose.model("Articulo", articuloSchema);

