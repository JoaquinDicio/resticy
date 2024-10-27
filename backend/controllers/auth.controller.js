import authService from "../services/auth.service.js";

const authController = {
  login(req, res) {
    const response = authService.login();
    res.status(200).send(response);
  },
  async regsiter(req, res) {
    try {
      const response = await authService.register();
      res.status(200).send(response);
    } catch (e) {
      console.log("Error creando el usuario:", e);
    }
  },
};

export default authController;
