const authAdmin = (req, res, next)=>{
    //aca uso mi nuevo usuario autorizado
    const user = req.user;
    // console.log(user);
    if(!user || user.role !== 'admin'){
        return res.status(403).send({error: "No tienes permisos para acceder"});
    }
    next();
};

module.exports = { authAdmin };