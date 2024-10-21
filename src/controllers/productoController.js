const { Articulo } = require('../models/articuloModel');


const createArticuloController = async (cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo) => {
    const articuloExiste = await Articulo.findOne({cod_articulo});
    if(articuloExiste) throw new Error('El código de artículo ya existe');

    const newArticulo = new Articulo({cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo});
    newArticulo.save();
    return newArticulo;
}

const getAllArticuloController = async () => {
    const allArticulos = await Articulo.find();  // Consulta todos los artículos
    if (!allArticulos.length) throw new Error('No hay artículos');
    return allArticulos;
}

const getArticuloByIdController = async (cod_articulo) => {
    const articuloById = await Articulo.findOne({cod_articulo});
    if(!articuloById) throw new Error('No existe el código de artículo');
    return articuloById;
}

const updateArticuloController = async (cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo) => {
    const newArticulo = {cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo};
    const updateArticulo = await Articulo.findByIdAndUpdate(cod_articulo, newArticulo, {new: true});
    if(!updateArticulo) throw new Error('No se pudo actualiar el articulo');
    return updateArticulo;
}

const deleteArticuloController = async (cod_articulo) => {
    try {
        const deleteArticulo = await Articulo.findByIdAndDelete(cod_articulo);
        if(!deleteArticulo) throw new Error('No se pudo eliminar el articulo');
        return 'El articulo ha sido eliminado correctamente';
    } catch (error) {
        throw new Error('No se pudo eliminar el articulo');
    }
}

module.exports = { createArticuloController, getAllArticuloController, getArticuloByIdController, updateArticuloController, deleteArticuloController };