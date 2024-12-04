const { User } = require('../models/userModel');
const { hashPassword, matchPassword } = require('../security/hashPass');
const { generateToken } = require('../security/token');

const registerController = async (name, username, email, password)=>{

    const existUser = await User.findOne({ email });
    if(existUser) throw new Error('El usuario ya existe');
      
    const role = 'user';

    const hashedPassword = await hashPassword(password);
    
    const newUserController = new User ({name, username, email, password: hashedPassword, role});
    newUserController.save();
    return newUserController;
}

const loginController = async (email, password)=>{
    const user = await User.findOne({email});
    if(!user) throw new Error('Usuario no registrado');

    const isPasswordMatch = await matchPassword(password, user.password);
    if(!isPasswordMatch) throw new Error('Contraseña incorrecta');

    const userToken = await generateToken(user);
    
    const { password: _, ...userWhatSeePw } = user;
    
    return {message:"Inicio de sesion exitoso", userToken, user: userWhatSeePw};
}


module.exports = { registerController, loginController };