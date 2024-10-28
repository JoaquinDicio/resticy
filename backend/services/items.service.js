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
    const { item } = req.body;

    if (!item.name?.trim() || !item?.price || !item.restaurant_id) {
      return {
        code: 400,
        message: "Error: el nombre y el precio son datos obligatorios",
      };
    }

    const { dataValues } = await Item.create({ ...item });

    return { code: 200, data: { ...dataValues }, ok: true };
  },
};

export default itemsService;
