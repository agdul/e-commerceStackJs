const { createArticuloController, getAllArticuloController, getArticuloByIdController, updateArticuloController, deleteArticuloController } = require('../controllers/productoController');
const { articuloValidator } = require('../validators/articuloValidator');

const createArticuloHandlers = async(req, res) => {
    try {
        const { error } = articuloValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo } = req.body;
        const response = await createArticuloController(cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo);
        return res.status(201).send(response);   
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

        const { cod_articulo } = req.params;
        const { nombre_articulo, descripcion_articulo, precio_articulo } = req.body;
        const response = await updateArticuloController(cod_articulo, nombre_articulo, descripcion_articulo, precio_articulo);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

const deleteArticuloHandlers = async(req, res) => {
    try {
        const { cod_articulo } = req.params;
        const response = await deleteArticuloController(cod_articulo);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

module.exports = { createArticuloHandlers, getAllArticuloHandlers, getArticuloByIdHandlers, updateArticuloHandlers, deleteArticuloHandlers };


