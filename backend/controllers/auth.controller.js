import authService from "../services/auth.service.js";

const authController = {
  async login(req, res) {
    try {

      const response = await authService.login(req);

      res.status(response.code).json(response);

    } catch (error) {

      res
        .status(500)
        .json({ message: "Ha ocurrido un error al iniciar sesion", error });
    }
  },

  async register(req, res) {
    try {
      const response = await authService.register(req);

      res.status(response.code).json(response);

    } catch (e) {
      console.log("Error creando el usuario:", e);
    }
  },
};

export default authController;
