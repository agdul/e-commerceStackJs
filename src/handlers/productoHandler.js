const { createArticuloController, getAllArticuloController, getArticuloByIdController, updateArticuloController, deleteArticuloController, uploadImagenController } = require('../controllers/productoController');
const { articuloValidator } = require('../validators/articuloValidator');

const createArticuloHandlers = async(req, res) => {
    try {

        console.log({
            respuesta_completa: req,
            
        })
        // recibo del front y valido 
        const { error } = articuloValidator.validate(req.body, { abortEarly: false });
        const file = req.file;
        


        //Validaciones de que lo que recibi este bien 
        if(error) return res.status(400).send(error.details[0].message);
        if (!file) return res.status(400).send('No se ha subido ninguna imagen');

        //Desestructuracion 
        const { cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo } = req.body;

        //Creo el articulo 
        const newArticulo = await createArticuloController(cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo);

        // Subimos la imagen y registramos la relacion con el articulo
        const newImagen = await uploadImagenController(file, newArticulo._id);
        

        return res.status(201).send({
            articulo: newArticulo,
            imgUrl: newImagen,
        });   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllArticuloHandlers = async(req, res) => {

    try {
        const { cod_articulo } = req.query;
        if (cod_articulo) {
            const response = await getArticuloByIdController(cod_articulo);
            return res.status(200).send(response);
        }else{ 
        const response = await getAllArticuloController();
        return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const getArticuloByIdHandlers = async(req, res) => {
    try {
        const { error } = articuloValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { cod_articulo } = req.params;
        const response = await getArticuloByIdController(cod_articulo);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

const updateArticuloHandlers = async(req, res) => {
    try {
        const { error } = articuloValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const file = req.file;
        const { cod_articulo } = req.params;
        const { nombre_articulo, descripcion_articulo, precio_articulo, stock_articulo } = req.body;

        // Verificar si hay datos para actualizar
        let articuloActualizado = null;
        if (nombre_articulo || descripcion_articulo || precio_articulo || stock_articulo) {
            articuloActualizado = await updateArticuloController(cod_articulo, {
                nombre_articulo,
                descripcion_articulo,
                precio_articulo,
                stock_articulo,
            });
        }
       // Procesar la imagen si se envió
       let nuevaImagen = null;
       if (file && articuloActualizado) {
           nuevaImagen = await uploadImagenController(file, articuloActualizado._id);
       }

       // Construir la respuesta
       const response = {
           articulo: articuloActualizado,
           imgUrl: nuevaImagen,
       };

       return res.status(200).send(response);

    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

const deleteArticuloHandlers = async(req, res) => {
    try {
        const { articuloId , imageId } = req.params;

        const response = await deleteArticuloController(articuloId, imageId);
        return res.status(200).send({ success: true, message: "Artículo eliminado con éxito" });
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}




module.exports = { createArticuloHandlers, getAllArticuloHandlers, getArticuloByIdHandlers, updateArticuloHandlers, deleteArticuloHandlers };


