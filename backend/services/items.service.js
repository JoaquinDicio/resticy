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
};

export default itemsService;
