const users = require('../db/dataBase');
const { hashPassword, matchPassword } = require('../security/hashPass');
const { generateToken } = require('../security/token');

const registerController = async (name, username, email, password, role = 'user')=>{
    if(users.some(user => user.email === email)) throw new Error('El usuario ya existe');

    const id = users.length + 1;
    const hashedPassword = await hashPassword(password);
    console.log(hashPassword);
    const newUserController = {id, name, username, email, password: hashedPassword, role};
    users.push(newUserController);
    return newUserController;
}

const loginController = async (email, password)=>{
    const user = users.find(user => user.email === email);
    if(!user) throw new Error('Usuario no registrado');

    const isPasswordMatch = await matchPassword(password, user.password);
    if(!isPasswordMatch) throw new Error('Contraseña incorrecta');

    const userToken = await generateToken(user);
    
    const { password: _, ...userWhatSeePw } = user;
    
    return {message:"Inicio de sesion exitoso", userToken, user: userWhatSeePw};
}


module.exports = { registerController, loginController };