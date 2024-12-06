const { cloudinary } = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid');
const Articulo = require('../models/articuloModel');
const Imagen = require('../models/imgModel');
const { reset } = require('nodemon');


const createArticuloController = async (cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo) => {
    const articuloExiste = await Articulo.findOne({cod_articulo});
    if(articuloExiste) throw new Error('El código de artículo ya existe');

    const newArticulo = new Articulo({cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo});
    newArticulo.save();
    return newArticulo;
}

const getAllArticuloController = async () => {
try {
// Consulta los artículos y realiza la población de las imágenes asociadas
//Usar lean() es útil cuando solo quieres leer los datos, sin modificarlos.
  const allArticulos = await Articulo.find().lean().exec();

  if (!allArticulos.length) throw new Error('No hay artículos');
// Buscar imágenes relacionadas para cada artículo
  const articulosConImagenes = await Promise.all(
  allArticulos.map(async (articulo) => {
      const imagenes = await Imagen.find({ id_articulo: articulo._id }).exec();
        return {
            ...articulo,
            imagenes, // Añadir las imágenes relacionadas
          };
    })  
  );
  return articulosConImagenes;

  } catch (error) {
     throw new Error(`Error al obtener artículos: ${error.message}`);
  }
};


const getArticuloByIdController = async (cod_articulo) => {
    const articuloById = await Articulo.findOne({cod_articulo});
    if(!articuloById) throw new Error('No existe el código de artículo');
    return articuloById;
}

const updateArticuloController = async (cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo) => {
    const newArticulo = {cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo};
    const updateArticulo = await Articulo.findOneAndDelete(cod_articulo, newArticulo, {new: true});
    if(!updateArticulo) throw new Error('No se pudo actualiar el articulo');
    return updateArticulo;
}

const deleteImgController = async (articuloId, imageId) => {
  try {
    // Buscar la img 
    const imagen = await Imagen.findById(imageId);
    if(!imagen){
      throw new Error('No se encontró la imagen');
    }

    // Extraer el `public_id` para mandarla a cloudinary
    const public_id = imagen.img_url.split('/').pop().split('.')[0];
    const response_cloudinari = await cloudinary.uploader.destroy(public_id);

    // Eliminar la imagen de la base de datos
    await Imagen.findByIdAndDelete(imageId);

    // Verificar si el artículo tiene más imágenes asociadas
    const imagenesArticulo = await Imagen.find({id_articulo: articuloId});
    if (imagenesArticulo.length === 0) {
      // Si no hay más imágenes asociadas al artículo, podemos eliminar el artículo
    await Articulo.findByIdAndDelete(articuloId);
    }
    return { message: "Imagen eliminada exitosamente y artículo si es necesario."
     };
  } catch (error) {
    console.error(error);
    throw new Error(`Error al eliminar la imagen o el artículo: ${error.message}`);
  }

}

const deleteArticuloController = async (articuloId, imageId) => {
  try {
    // Buscar y eliminar el artículo
      const articulo = await Articulo.findByIdAndDelete(articuloId);
      if (!articulo) throw new Error('No se encontró el artículo para eliminar');
      
      deleteImgController(articuloId, imageId);
      
      return 'El artículo y/o su imagen asociada fueron eliminados correctamente';
  } catch (error) {
      throw new Error(`Error al eliminar: ${error.message}`);
  }
};

const uploadImagenController = async (file, articuloId) => {
    try {
      // Envolver el upload_stream en una Promesa 
      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream( //interactuamos con la api
            { folder: 'uploads/', public_id: uuidv4() },
            (error, result) => {
              if (error) return reject(new Error('⚠ Error al subir la imagen a Cloudinary.'));
              resolve(result); // Retorna el resultado de la subida
            }
          );
          stream.end(file.buffer); // Envía el buffer al stream
        });
  
      // Subir la imagen
      const result = await uploadToCloudinary();
  
      // Guardar la URL de la imagen en la base de datos
      const newImg = new Imagen({
        id_articulo: articuloId,
        img_url: result.secure_url,
      });
  
      await newImg.save();
      return newImg;
    } catch (error) {
      console.error('⚠ Error al subir imagen a Cloudinary:', error.message);
      throw new Error('⚠ Error al subir la imagen.');
    }
  };

module.exports = { createArticuloController, getAllArticuloController, getArticuloByIdController, updateArticuloController, deleteArticuloController, uploadImagenController, deleteImgController };