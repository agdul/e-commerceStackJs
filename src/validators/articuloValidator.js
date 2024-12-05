const Joi = require("joi");

const articuloValidator = Joi.object({
    cod_articulo: Joi.string()
        .min(5)
        .max(15)
        .required()
        .messages({
            'string.base': 'El código de artículo debe ser un texto',
            'string.empty': 'El código de artículo no puede estar vacío',
            'string.min': 'El código de artículo debe tener al menos {#limit} caracteres',
            'string.max': 'El código de artículo no debe exceder los {#limit} caracteres',
            'any.required': 'El código de artículo es obligatorio',
        }),
    nombre_articulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': 'El nombre del artículo debe ser un texto',
            'string.empty': 'El nombre del artículo no puede estar vacío',
            'string.min': 'El nombre del artículo debe tener al menos {#limit} caracteres',
            'string.max': 'El nombre del artículo no debe exceder los {#limit} caracteres',
            'any.required': 'El nombre del artículo es obligatorio',
        }),
    descripcion_articulo: Joi.string()
        .min(5)
        .max(500)
        .messages({
            'string.base': 'La descripción del artículo debe ser un texto',
            'string.empty': 'La descripción del artículo no puede estar vacía',
            'string.min': 'La descripción del artículo debe tener al menos {#limit} caracteres',
            'string.max': 'La descripción del artículo no debe exceder los {#limit} caracteres',
        }),
    precio_articulo: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'El precio del artículo debe ser un número',
            'number.min': 'El precio del artículo debe ser mayor o igual a {#limit}',
            'any.required': 'El precio del artículo es obligatorio',
        }),
    stock_articulo: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El stock del artículo debe ser un número entero',
            'number.integer': 'El stock del artículo debe ser un número entero',
            'number.min': 'El stock del artículo debe ser mayor o igual a {#limit}',
            'any.required': 'El stock del artículo es obligatorio',
        }),
});

module.exports = { articuloValidator };
