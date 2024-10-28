import User from "../models/User.js";
import bcrypt from "bcrypt";

const authService = {
  async login(req) {
<<<<<<< HEAD
    
    const {email, password} = req.body;
=======
    const { email, password } = req.body;

>>>>>>> 5a3ba83726c1dd325d0e04fc7a1f55f99f99cf02
    const userByEmail = await User.findOne({ where: { email: email } });

    if (!userByEmail) {
      return {
        code: 400,
        message: "No existe un usuario con ese Email.",
        ok: false,
      };
    }
<<<<<<< HEAD
    
    const isValidCredentials = await bcrypt.compare(password, userByEmail.password)
    if(isValidCredentials){
      return {code: 200, message: "Usuario Autenticado Correctamente.", ok: true}
    }else{
      return {code: 400, message: "Credenciales invalidas.", ok: false}
=======

    const isValidCredentials = await bcrypt.compare(
      password,
      userByEmail.password
    );

    if (isValidCredentials) {
      return {
        code: 200,
        message: "Usuario Autenticado Correctamente.",
        ok: true,
      };
    } else {
      return { code: 400, message: "Credenciales invalidas.", ok: false };
>>>>>>> 5a3ba83726c1dd325d0e04fc7a1f55f99f99cf02
    }
    
  },
  async register(req) {
    const { name, password, email } = req.body;
    const userByEmail = await User.findOne({ where: { email: email } });

    if (userByEmail) {
      return {
        code: 400,
        message: "Ya existe un usuario con este email.",
        ok: false,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      password: hashPassword,
      email: email,
      role_id: 1,
      restaurant_id: 1,
    });

    return { code: 200, message: "Usuario creado correctamente", ok: true };
  },
};

export default authService;
