import User from "../models/User.js";
import bcrypt from "bcrypt";

const authService = {
  async login(req) {
    
    const {email, password} = req.body;
    const userByEmail = await User.findOne({ where: { email: email } });

    if(!userByEmail){
      return {code: 400, message: "No existe un usuario con ese Email.", ok: false};
    }
    
    const isValidCredentials = await bcrypt.compare(password, userByEmail.password)
    if(isValidCredentials){
      return {code: 200, message: "Usuario Autenticado Correctamente.", ok: true}
    }else{
      return {code: 400, message: "Credenciales invalidas.", ok: false}
    }
    
  },
  async register(req) {

    const {name, password, email} = req.body;
    const userByEmail = await User.findOne({ where: { email: email } });
   
    if(userByEmail){
      return {code: 400, message: "Ya existe un usuario con este email.", ok: false};
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      password: hashPassword,
      email: email,
      role_id: 1,
      restaurant_id: 1,
    });
    
    return {code: 200, message: "Usuario creado correctamente", ok: true};
  },
};

export default authService;
