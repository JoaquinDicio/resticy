import Item from "../models/Item.js";

const itemsService = {
  async getItemsByRestaurant(req) {
    const { restaurantID } = req.params;
    const items = await Item.findAll({
      where: { restaurant_id: restaurantID },
    });

    return { code: 200, data: [...items], ok: true };
  },

  async addNewItem(req) {
    const { name, price, restaurant_id } = req.body;
    const uploadedFile = req.file;

    console.log(req.body);
    console.log(uploadedFile);

    // validaciones

    if (!name?.trim() || !price || !restaurant_id) {
      return {
        code: 400,
        message:
          "Error: el nombre, el precio y el restaurante son obligatorios",
      };
    }

    let imgPath = null;
    if (uploadedFile) {
      imgPath = `${uploadedFile.filename}`;
    }

    // crea el nuevo producto en la base de datos

    try {
      const newItem = await Item.create({
        name,
        price,
        restaurant_id,
        img: imgPath,
      });

      return {
        code: 200,
        data: newItem,
        ok: true,
      };
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return {
        code: 500,
        message: "Error interno del servidor",
      };
    }
  },
};

export default itemsService;
