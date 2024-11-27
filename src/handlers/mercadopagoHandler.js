const { createOrderController } = require ('../controllers/mercadopagoController');
const { ordenValidator } = require ('../validators/ordenValidator');



const createOrderHandler = async (req, res) =>{
    try {
        const { error } = ordenValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const { items } = req.body;
        const response = await createOrderController(items);
        return res.status(201).send(response);        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { createOrderHandler }