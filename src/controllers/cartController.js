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

    //console.log(cartDetails)
  
    return { items: cartDetails, subtotal };
  };
  
  const emptyCartController = async (userId) => {
    
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart || cart.items.length === 0) {
      throw new Error('Carrito vacío');
    }
  

    return { message: 'Carrito vacíado' };
  }

  const removeOneProductCartController = async (userId, cod_articulo) => {

    // Busca el carrito del usuario  y verifica que el carrito exista y tenga productos
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0 ) {
      throw new Error('Carrito vacio o Producto no encontrado en el carrito');
    }

    // Buscar e l producto en el carrito
    const itemIndex = cart.items.findIndex((item) => item.cod_articulo.equals(cod_articulo));
    if (itemIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    // Decrementa la cantidad del producto
    if (cart.items[itemIndex].quantity > 1){
      cart.items[itemIndex].quantity -= 1;
    }else {
      // Eliminar el producto del carrito si este llega a 0
      cart.items.splice(itemIndex, 1);
    }

    // Guardar el carrito actualizado
    await cart.save();

    // Si era el ultimo elemento del carrito, el carrito esta vacio 
    if (cart.items.length === 0){
      return{ message: 'Carrito vacio, todo los productos eliminados'}
    }

    return { message: 'Producto eliminado del carrito', cart };
  }

  const incrementOneProductController = async (userId, cod_articulo) => {
    // Busca el carrito del usuario y verifica que exista
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      throw new Error('Carrito vacío o producto no encontrado');
    }
  
    // Buscar el producto en el carrito
    const itemIndex = cart.items.findIndex((item) => item.cod_articulo.equals(cod_articulo));
    if (itemIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }
  
    // Buscar el stock del producto en la colección Articulos
    const product = await Articulos.findById(cod_articulo);
    if (!product) {
      throw new Error('Producto no encontrado en la base de datos');
    }
  
    // Verificar si hay suficiente stock
    if (cart.items[itemIndex].quantity + 1 > product.stock_articulo) {
      throw new Error('No hay suficiente stock para incrementar la cantidad');
    }
  
    // Incrementar la cantidad del producto
    cart.items[itemIndex].quantity += 1;
  
    // Guardar el carrito actualizado
    await cart.save();
  
    return { message: 'Cantidad del producto incrementada', cart };
  };

  const confirmPurchaseController = async (userId) => {
  // Buscar el carrito del usuario y verificar que exista y tenga productos
    const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    throw new Error('El carrito está vacío');
  }

  // Buscar el stock de los productos en la colección Articulos
  for (const item of cart.items) {
    const product = await Articulos.findById(item.cod_articulo);
    if (!product) {
      throw new Error(`Producto con ID ${item.cod_articulo} no encontrado`);
    }

    // Verificar si hay suficiente stock
    if (product.stock_articulo < item.quantity) {
      throw new Error(`Stock insuficiente para el producto: ${product.nombre_articulo}`);
    }

    // Actualizar el stock del producto
    product.stock_articulo -= item.quantity;
    await product.save();
  }

  // Vaciar el carrito después de confirmar la compra
  await emptyCartController(userId) ;

  return { message: 'Compra confirmada y carrito vaciado' };
  };
  

  module.exports = { addProductToCartController, viewCartController, emptyCartController, removeOneProductCartController, incrementOneProductController, confirmPurchaseController  };