import authService from "../services/auth.service.js";

const authController = {
  async login(req, res) {
    try {
      const response = await authService.login(req);
      res.status(200).json(response);
    } catch (error) {
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
};

export default authController;
