const Cart = require('../models/cartModel');
const Articulos = require('../models/articuloModel');

const addProductToCartController = async (userId, productId, quantity) => {
    // Verificar que el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    // Verificar stock
    if (product.stock < quantity) {
      throw new Error('Stock insuficiente');
    }
  
    // Buscar o crear un carrito para el usuario
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
  
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find((item) => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  
    // Guardar el carrito actualizado
    await cart.save();
  
    return { message: 'Producto agregado al carrito', cart };
  };
  
  const viewCartController = async (userId) => {
    // Buscar el carrito del usuario y poblar los detalles del producto
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      throw new Error('Carrito vacío');
    }
  
    const cartDetails = cart.items.map((item) => ({
      product: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      total: item.productId.price * item.quantity,
    }));
  
    const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0);
  
    return { items: cartDetails, subtotal };
  };
  
  module.exports = {
    addProductToCartController,
    viewCartController,
  };