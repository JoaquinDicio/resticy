import Table from "../models/Table.js";
import HttpError from "../errors/HttpError.js"

const tablesService = {
  async getTablesByRestaurant(req) {
    const { restaurantID } = req.params;

    const tables = await Table.findAll({
      where: { restaurant_id: restaurantID },
    });

    return tables;
  },

  async createTable(req) {

    const { user, body } = req;
    const { restaurantID } = user;

    // verificamos si ya tiene una mesa con ese numero
    const existingTable = await Table.findAll({
      where: {
        restaurant_id: restaurantID,
        number: body.number
      },
    });

    if (existingTable[0]) {
      throw new HttpError("Ya existe una mesa con ese numero", 400)
    }

    //si no existe la mesa se crea
    const newTable = await Table.create({
      number: body.number,
      restaurant_id: restaurantID,
    });

    return newTable
  },

  async deleteTableById(req) {
    const { tableID } = req.params;

    const deleted = await Table.destroy({ where: { id: tableID } });

    return deleted
  },
};

export default tablesService;
