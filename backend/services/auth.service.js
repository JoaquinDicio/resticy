import User from "../models/User.js";
import bcrypt from "bcrypt";

const authService = {
  async login(req) {
    const { email, password } = req.body;
    const userByEmail = await User.findOne({ where: { email: email } });

    if (!userByEmail) {
      return {
        code: 400,
        error: { email: "No existe un usuario con ese email" },
        ok: false,
      };
    }

    const validCredentials = await bcrypt.compare(
      password,
      userByEmail.password
    );

    if (validCredentials) {
      return {
        code: 200,
        message: "Usuario Autenticado Correctamente.",
        ok: true,
      };
    }

    return {
      code: 400,
      error: { credentials: "Credenciales inválidas" },
      ok: false,
    };
  },

  async register(req) {
    const { name, password, email } = req.body;

    const userByEmail = await User.findOne({ where: { email: email } });

    if (userByEmail) {
      return {
        code: 400,
        error: { email: "Ya existe un usuario con este email" },
        ok: false,
      };
    }

    if (password.trim().length < 6) {
      return {
        code: 400,
        error: { password: "La contraseña debe tener al menos 6 caracteres" },
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
