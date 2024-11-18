import { where } from "sequelize";
import Item from "../models/Item.js";
import fs from "fs";

const itemsService = {
  async getItemsByRestaurant(req) {
    let restaurantID;

    // siempre que se use req.params para enviar esta informacion]
    //debe ser para fines de VISUALIZACION y nada mas, de lo contrario se envia por token
    if (req.user) {
      //si viajo en el token quiere decir que esta logueado
      restaurantID = req.user.restaurantID;
    } else {
      //si no esta logueado usa el parametro de la url
      restaurantID = req.params.restaurantID;
    }

    const items = await Item.findAll({
      where: { restaurant_id: restaurantID },
    });

    return { code: 200, data: [...items], ok: true };
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

    //si el id no existe
    if (!id) {
      return {
        code: 400,
        error: {
          message: "El ID del item es obligatorio.",
        },
      };
    }

    const item = await Item.findOne({
      where: {
        id: id,
      },
    });

    try {
      //busca el item y lo destruye mediante el ID

      const itemToDestroy = await Item.destroy({
        where: { id },
      });

      //si no existe devuelve un mensaje de error

      if (!itemToDestroy) {
        return {
          code: 404,
          error: {
            message: "El item no fue encontrado.",
          },
        };
      }

      //elimina el archivo usando la ruta del img

      fs.unlink(`../backend/public/uploads/${item.img}`, (err) => {
        if (err) {
          console.error("Ocurrio un error al eliminar el archivo:", err);
          return;
        }
      });

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
      //si no se manda un id devuelve un error

      if (!id) {
        return {
          code: 404,
          error: {
            message: "No se ha proporcionado ningun id",
          },
        };
      }

      //si existe el id busca el item para actualizar

      const item = await Item.findByPk(id);

      //si no existe un producto con ese id devuelve un error

      if (!item) {
        return {
          code: 404,
          error: {
            message: "No existe un producto con ese id para actualizar",
          },
        };
      }

      //si todo sale bien, se actualiza el producto deseado
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
    } catch (error) {}
  },
};

export default itemsService;
