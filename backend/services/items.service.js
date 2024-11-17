import Item from "../models/Item.js";
import fs from "fs";

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

    // validaciones

    if (!name?.trim() || !price || !restaurant_id) {
      return {
        code: 400,
        message:
          "Error: el nombre, el precio y el restaurante son obligatorios",
      };
    }

    //se crea la ruta que se guarda en la base de datos

    let imgPath = null;
    uploadedFile ? (imgPath = `${uploadedFile.filename}`) : "No existe la ruta";

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
