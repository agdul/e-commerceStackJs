const Cart = require('../models/cartModel');
const Articulos = require('../models/articuloModel');

const addProductToCartController = async (userId, cod_articulo, quantity) => {
    // Verificar que el producto existe
    const product = await Articulos.findById(cod_articulo);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    // Verificar stock
    if (product.stock_articulo < quantity) {
      throw new Error('Stock insuficiente');
    }
  
    // Buscar o crear un carrito para el usuario
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
  
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find((item) => item.cod_articulo.equals(cod_articulo));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ cod_articulo, quantity });
    }
  
    // Guardar el carrito actualizado
    await cart.save();
  
    return { message: 'Producto agregado al carrito', cart };
  };
  
  const viewCartController = async (userId) => {
    // Buscar el carrito del usuario y poblar los detalles del producto
    const cart = await Cart.findOne({ userId }).populate('items.cod_articulo');
    if (!cart) {
      throw new Error('Carrito vacío');
    }
  
    const cartDetails = cart.items.map((item) => ({
      id: item.cod_articulo._id.toString(),
      title: item.cod_articulo.nombre_articulo,
      unit_price: item.cod_articulo.precio_articulo,
      quantity: item.quantity,
      total: item.cod_articulo.precio_articulo * item.quantity,
    }));
  
    const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0);

    console.log(cartDetails)
  
    return { items: cartDetails, subtotal };
  };
  
  module.exports = { addProductToCartController, viewCartController };