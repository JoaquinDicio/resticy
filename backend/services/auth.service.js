import User from "../models/User.js";

const authService = {
  login() {
    return "Hola desde el login";
  },
  async register() {
    const newUser = await User.create({
      name: "JoaquinDicio",
      email: "joacodicio@gmail.com",
      role_id: 1,
      restaurant_id: 1,
    });

    return "auto-generated ID: " + newUser.id;
  },
};

export default authService;
