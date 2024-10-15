const Joi = require("joi");

const userValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres',
            'any.required': 'El nombre es obligatorio',
        }),
    username: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.empty': 'El nombre de usuario no puede estar vacío',
            'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
            'any.required': 'El nombre de usuario es obligatorio',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Debes proporcionar un email válido',
            'any.required': 'El email es obligatorio',
        }),
    password: Joi.string()
        .pattern(/^(?=(.*[A-Z]))(?=(.*\d))([A-Za-z\d]{6,24})$/)
        .required()
        .messages({
            'string.pattern.base': 'La contraseña debe tener entre 6 y 24 caracteres, al menos una letra mayúscula y un número',
            'string.empty': 'La contraseña no puede estar vacía',
            'any.required': 'La contraseña es obligatoria',
        }),
    role: Joi.string()
        .valid('admin', 'user')
        .messages({
            'any.only': 'El rol debe ser "admin" o "user"',
        })
});

const userUpdateValidator = Joi.object({
    _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()  // Lo hacemos opcional ya que no siempre lo necesitas en el cuerpo
        .messages({
            'string.pattern.base': 'El ID debe ser un ID de MongoDB válido de 24 caracteres hexadecimales',
        }),
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos {#limit} caracteres',
            'any.required': 'El nombre es obligatorio',
        }),
    username: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.empty': 'El nombre de usuario no puede estar vacío',
            'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
            'any.required': 'El nombre de usuario es obligatorio',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Debes proporcionar un email válido',
            'any.required': 'El email es obligatorio',
        }),
    password: Joi.string()
        .pattern(/^(?=(.*[A-Z]))(?=(.*\d))([A-Za-z\d]{6,24})$/)
        .optional() // Hacemos que la contraseña sea opcional en esta validación
        .messages({
            'string.pattern.base': 'La contraseña debe tener entre 6 y 24 caracteres, al menos una letra mayúscula y un número',
        }),
    role: Joi.string()
        .valid('admin', 'user')
        .messages({
            'any.only': 'El rol debe ser "admin" o "user"',
        }),
    __v: Joi.number()
        .optional()
        .messages({'__v': 'Falta el campo',})  // Lo hacemos opcional ya que no siempre lo necesitas en el cuerpo
});



module.exports = { userValidator, userUpdateValidator };
