const Joi = require("joi");

// Esquema de validación para crear órdenes
const orderValidator = Joi.object({
    items: Joi.array().items(
        Joi.object({
            id: Joi.string()
                .required()
                .messages({
                    'string.base': 'El ID debe ser un texto.',
                    'string.empty': 'El ID no puede estar vacío.',
                    'any.required': 'El ID es obligatorio.',
                }),
            title: Joi.string()
                .required()
                .messages({
                    'string.base': 'El título debe ser un texto.',
                    'string.empty': 'El título no puede estar vacío.',
                    'any.required': 'El título es obligatorio.',
                }),
            quantity: Joi.number()
                .integer()
                .min(1)
                .required()
                .messages({
                    'number.base': 'La cantidad debe ser un número.',
                    'number.integer': 'La cantidad debe ser un número entero.',
                    'number.min': 'La cantidad debe ser al menos {#limit}.',
                    'any.required': 'La cantidad es obligatoria.',
                }),
            unit_price: Joi.number()
                .precision(2)
                .min(0)
                .required()
                .messages({
                    'number.base': 'El precio debe ser un número.',
                    'number.min': 'El precio debe ser mayor o igual a {#limit}.',
                    'any.required': 'El precio es obligatorio.',
                }),
            total: Joi.number() // Incluir la validación para `total`
                .precision(2)
                .min(0)
                .required()
                .messages({
                    'number.base': 'El total debe ser un número.',
                    'number.min': 'El total debe ser mayor o igual a {#limit}.',
                    'any.required': 'El total es obligatorio.',
                }),
        })
    ).min(1).required()
    .messages({
        'array.base': 'Los items deben ser un arreglo.',
        'array.min': 'Debes incluir al menos un item.',
        'any.required': 'Los items son obligatorios.',
    }),
});

module.exports = { orderValidator };
