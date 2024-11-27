const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      cod_articulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Articulo', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

module.exports  = mongoose.model('Cart', cartSchema);

