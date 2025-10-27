import Item from "../models/Item.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import HttpError from "../errors/HttpError.js";


const itemsService = {
  async getItemsByRestaurant(req) {
    const { restaurantID } = req.params;

    if (!restaurantID) {
      throw new HttpError("restaurantID es un parametro requerido", 400);
    }

    const items = await Item.findAll({
      where: { restaurant_id: restaurantID },
    });

    return items;
  },

  async addNewItem(req) {
    const { user } = req;

    const restaurant_id = user.restaurantID;

    const uploadedFile = req.file;

    const itemData = { ...req.body, uploadedFile, restaurant_id };

    const REQUIRED = ["name", "price", "restaurant_id", "uploadedFile"];

    REQUIRED.forEach((field) => {
      if (itemData[field] === null || itemData[field] === "") {
        throw new HttpError(`${field} es un dato obligatorio`, 400);
      }
    });

    //se crea la ruta que se guarda en la base de datos
    let imgPath = null;
    uploadedFile ? (imgPath = `${uploadedFile.filename}`) : "No existe la ruta";

    // crea el nuevo producto en la base de datos
    const newItem = await Item.create({
      name: itemData.name,
      price: itemData.price,
      restaurant_id,
      img: imgPath,
    });

    return newItem;
  },

  async deleteItem(req) {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    //elimina el archivo usando la ruta del img
    if (item) {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      const imagePath = path.join(__dirname, "../public/uploads", item.img);

      fs.unlink(imagePath, (err) => {
        if (err) {
          throw new HttpError("Error eliminando la imagen de portada", 400)
        }
      });
    }

    //busca el item y lo destruye mediante el ID
    const itemToDestroy = await Item.destroy({
      where: { id },
    });

    if (!itemToDestroy) {
      throw new HttpError("El item no existe", 404)
    }

    return {
      message: "El item fue eliminado exitosamente.",
      ok: true,
    };

  },

  async updateItem(req) {
    const { name, price, id } = req.body;

    const required = ["name", "price"];

    required.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() == "") return new HttpError(`El campo ${field} es obligatorio`)
    });

    const item = await Item.findByPk(id);

    if (!item) {
      throw new HttpError("No existe un producto con ese ID para actualizar", 404)
    }

    await item.update({
      name: name || item.name,
      price: price || item.price,
    });

    return { ok: true }
  },
};

export default itemsService;
