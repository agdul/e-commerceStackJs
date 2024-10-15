const { registerController, loginController } = require("../controllers/authController");
const { userValidator } = require("../validators/userValidator");

const registerHandler = async (req, res)=>{
    try {
        const { error } = userValidator.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const {name, username, email, password, role } = req.body;
        const response = await registerController(name, username, email, password, role);
        return res.status(201).send(response);        
    } catch (error) {
        return res.status(400).send({Error: error.message});
    }
}

const loginHandler = async (req, res) => {
    try{
        const {email, password} = req.body;
        const response = await loginController(email,password);
        return res.status(200).send(response);
    } catch (error) {
        res.status(400).send({Error: error.message});
    }
}

module.exports = { registerHandler, loginHandler };