import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  async login(req) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return {
        code: 400,
        error: { email: "No existe un usuario con ese email" },
        ok: false,
      };
    }

    const validCredentials = await bcrypt.compare(password, user.password);

    if (validCredentials) {
      const token = jwt.sign(
        { id: user.id, email: user.email, restaurantID: user.restaurant_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        code: 200,
        user: {
          restaurantID: user.restaurant_id,
          name: user.name,
        },
        ok: true,
        token,
      };
    }

    //si las credenciales son invalidas
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

    //se crea el restaurante antes que el usuario para luego asignarle el restaurant.id

    const restaurant = await Restaurant.create({
      name: name,
      address: "No hay una direccion por ahora",
      phone: "No hay un telefono por ahora",
    });

    await User.create({
      name: name,
      password: hashPassword,
      email: email,
      role_id: 1,
      restaurant_id: restaurant.id,
    });

    return { code: 200, message: "Usuario creado correctamente", ok: true };
  },
};

export default authService;
