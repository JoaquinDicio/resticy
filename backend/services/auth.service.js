import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../errors/HttpError.js";
import checkIfInputsAreEmpty from "../utils/checkIfInputsAreEmpty.js";

const authService = {
  async login(req) {
    const { email, password } = req.body;

    const REQUIRED = ["email", "password"];

    //chequea inputs vacios
    if (checkIfInputsAreEmpty(req.body, REQUIRED)) {
      throw new HttpError("Debe completar todos los campos.", 400);
    }

    //chequea si el usuario existe
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new HttpError("No existe un usuario con ese email", 400);
    }

    const validCredentials = await bcrypt.compare(password, user.password);

    // si todo fue bien, valida las credenciales y genera el token
    if (validCredentials) {
      const token = jwt.sign(
        { id: user.id, email: user.email, restaurantID: user.restaurant_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        user: {
          restaurantID: user.restaurant_id,
          name: user.name,
        },
        token,
      };
    }

    //si las credenciales son invalidas
    throw new HttpError("Las credenciales son incorrectas.", 400);
  },

  async register(req) {
    const { name, password, email } = req.body;

    const userByEmail = await User.findOne({ where: { email: email } });

    if (userByEmail) {
      throw new HttpError("Ya existe un usuario con ese email.", 404);
    }

    if (password.trim().length < 6) {
      throw new HttpError("La clave debe tener al menos 6 caracteres.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //se crea el restaurante antes que el usuario para luego asignarle el restaurant.id

    const restaurant = await Restaurant.create({
      name: name,
      address: "No hay una direccion por ahora.",
      phone: "No hay un telefono por ahora.",
    });

    await User.create({
      name: name,
      password: hashPassword,
      email: email,
      role_id: 1,
      restaurant_id: restaurant.id,
    });

    return { message: "Usuario creado correctamente.", ok: true };
  },

  async me(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw HttpError("Acceso no autorizado", 401);

    //extracts de user info from the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user) return user;
  },
};

export default authService;
