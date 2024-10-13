const jwt = require('jsonwebtoken');

async function generateToken(user){
    const secretKey = process.env.SECRET_KEY;
    //payload: informacion a icluir en el tokem
    const payload = { 
        userId: user.id,
        username: user.username,
        role: user.role
    };
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    }
     catch(error) {
        throw new Error('No se pudo genera el token');
    }
}

async function verifyToken(token) {
    const secretKey = process.env.SECRET_KEY;
    try {
       const decoded = jwt.verify(token, secretKey);
        return decoded;
    }catch (error) {
        throw new Error('Token invalido');
    }
}

module.exports = { generateToken, verifyToken };