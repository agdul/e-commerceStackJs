const { verifyToken } = require("../security/token");

const tokenMiddelware = async (req, res, next) => {
    try {
    const authtoken = req.header("Authorization");
    if (!authtoken) return res.status(401).send({ error: "Token no encontrado" });

    const token = authtoken.split(' ')[1];
    if(!token) return res.status(403).send({ error: "Token invalido" });
    
    const validateToken = await verifyToken(token);

    //Este va ser mi nuevo usuario autorizado y lo mando x req
    req.user = validateToken;
    
    // Para debuggear el token validado
    // console.log(validateToken);
    next();

    } catch (error) {
        return res.status(403).send({ error: error.message });
    }   
}

module.exports = { tokenMiddelware };