import Item from "../models/Item.js";
import fs from "fs";

const itemsService = {
  async getItemsByRestaurant(req) {
    const { restaurantID } = req.params;

    try {
      const items = await Item.findAll({
        where: { restaurant_id: restaurantID },
      });
      return { code: 200, data: [...items], ok: true };
    } catch (e) {
      console.log("Error obteniendo los items:", e);
    }
  },

  async addNewItem(req) {
    const { user } = req;
    const restaurant_id = user.restaurantID;
    const { name, price } = req.body;
    const uploadedFile = req.file;

    // validaciones

    if (name === "") {
      return {
        code: 400,
        error: {
          name: "El nombre es obligatorio.",
        },
      };
    }
    if (price === "") {
      return {
        code: 400,
        error: {
          price: "El precio es obligatorio",
        },
      };
    }
    if (restaurant_id === "") {
      return {
        code: 400,
        error: {
          restaurant_id: "El restaurant ID es obligatorio",
        },
      };
    }
    if (uploadedFile === null) {
      return {
        code: 400,
        error: {
          file: "La imagen es obligatoria",
        },
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

  async deleteItem(req) {
    const { id } = req.params;

    try {
      const item = await Item.findByPk(id); // se usa para obtener la url y eliminar la foto relacionada
      //elimina el archivo usando la ruta del img
      if (item) {
        console.log(item);
        fs.unlink(`../backend/public/uploads/${item.img}`, (err) => {
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

      //si existe el item, se actualiza el producto deseado
      await item.update({
        name: name || item.name,
        price: price || item.price,
      });

      return {
        code: 200,
        error: {
          message: "Producto actualizado con exito",
        },
      };
    } catch (error) {
      console.log("Error actualizando el producto:", e);
    }
  },
};

export default itemsService;
