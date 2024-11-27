const Joi = require("joi");

// Esquema de validación para crear órdenes
const orderValidator = Joi.object({
    items: Joi.array().items(
        Joi.object({
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
            price: Joi.number()
                .precision(2)
                .min(0)
                .required()
                .messages({
                    'number.base': 'El precio debe ser un número.',
                    'number.min': 'El precio debe ser mayor o igual a {#limit}.',
                    'any.required': 'El precio es obligatorio.',
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
