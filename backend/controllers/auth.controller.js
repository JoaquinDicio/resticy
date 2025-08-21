import { response } from "express";
import authService from "../services/auth.service.js";

const authController = {
  async login(req, res) {
    try {

      const response = await authService.login(req);

      res.status(response.code).json(response);

      res.status(200).json(response);
    } catch (error) {

      res
        .status(500)
        .json({ message: "Ha ocurrido un error al iniciar sesion", error });
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },

  async register(req, res) {
    try {
      const response = await authService.register(req);

      res.status(200).json(response);

    } catch (error) {
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },

  //validates token and return user data
  async me(req, res) {
    try {
      const repsonse = await authService.me(req);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.code || 500).json({ ...error, message: error.message });
    }
  },
};

export default authController;
