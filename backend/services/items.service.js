import Item from "../models/Item.js";
import fs from "fs";
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
        throw new HttpError(`El ${field} es un dato obligatorio`);
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

    try {
      const item = await Item.findByPk(id); // se usa para obtener la url y eliminar la foto relacionada
      //elimina el archivo usando la ruta del img
      if (item) {
        fs.unlink(`backend/public/uploads/${item.img}`, (err) => {
          if (err) {
            console.error("Ocurrio un error al eliminar el archivo:", err);
            return;
          }
        });
      }

      //busca el item y lo destruye mediante el ID
      const itemToDestroy = await Item.destroy({
        where: { id },
      });

      if (!itemToDestroy) {
        return {
          code: 404,
          error: {
            message: "El item no fue encontrado.",
          },
        };
      }

      return {
        code: 200,
        message: "El item fue eliminado exitosamente.",
        ok: true,
      };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return {
        code: 500,
        error: {
          message: "Error interno del servidor al eliminar el producto.",
        },
      };
    }
  },

  async updateItem(req) {
    const { name, price, id } = req.body;
    const required = ["name", "price"];
    const error = {};

    required.forEach((field) => {
      if (!req.body[field] || req.body[field].trim() == "") {
        error[field] = "El campo es obligatorio";
      }
    });

    try {
      const item = await Item.findByPk(id);

      if (!item) {
        return {
          code: 404,
          error: {
            message: "No existe un producto con ese id para actualizar",
          },
        };
      }

      // si el objeto de errores tiene valores
      if (Object.keys(error).length > 0) {
        return {
          code: 400,
          error,
          ok: false,
        };
      }

      //si existe el item, se actualiza el producto deseado
      await item.update({
        name: name || item.name,
        price: price || item.price,
      });

      return {
        code: 200,
        data: {
          message: "Producto actualizado con exito",
        },
      };
    } catch (error) {
      console.log("Error actualizando el producto:", error);
    }
  },
};

export default itemsService;
