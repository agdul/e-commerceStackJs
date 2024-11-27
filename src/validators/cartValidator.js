const Joi = require('joi');

// Validación para agregar productos al carrito
const addProductToCartValidator = Joi.object({
  cod_articulo: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validación para un ObjectId válido
    .required()
    .messages({
      'string.base': 'El código del artículo debe ser un texto',
      'string.empty': 'El código del artículo no puede estar vacío',
      'string.pattern.base': 'El código del artículo debe ser un ID válido de MongoDB',
      'any.required': 'El código del artículo es obligatorio',
    }),
  quantity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'La cantidad debe ser un número',
      'number.integer': 'La cantidad debe ser un número entero',
      'number.positive': 'La cantidad debe ser un número positivo',
      'any.required': 'La cantidad es obligatoria',
    }),
});

// Validación para la estructura general del carrito
const cartValidator = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'El ID del usuario debe ser un texto',
      'string.empty': 'El ID del usuario no puede estar vacío',
      'string.pattern.base': 'El ID del usuario debe ser un ID válido de MongoDB',
      'any.required': 'El ID del usuario es obligatorio',
    }),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'string.base': 'El ID del producto debe ser un texto',
            'string.empty': 'El ID del producto no puede estar vacío',
            'string.pattern.base': 'El ID del producto debe ser un ID válido de MongoDB',
            'any.required': 'El ID del producto es obligatorio',
          }),
        quantity: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'La cantidad debe ser un número',
            'number.integer': 'La cantidad debe ser un número entero',
            'number.positive': 'La cantidad debe ser un número positivo',
            'any.required': 'La cantidad es obligatoria',
          }),
      })
    )
    .required()
    .messages({
      'array.base': 'Los items deben ser un arreglo',
      'array.includesRequiredUnknowns': 'Cada item debe contener un producto válido y una cantidad',
      'any.required': 'Los items son obligatorios',
    }),
});

module.exports = { addProductToCartValidator, cartValidator };
