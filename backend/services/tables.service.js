import Table from "../models/Table.js";

const tablesService = {
  async getTablesByRestaurant(req) {
    try {
      const { restaurantID } = req.params;

      const tables = await Table.findAll({
        where: { restaurant_id: restaurantID },
      });

      return { code: 200, data: [...tables], ok: true };
    } catch (e) {
      console.log("Eror obteniendo las mesas:", e);
    }
  },

  async createTable(req) {
    const { user, body } = req;
    const { restaurantID } = user;

    try {
      // verificamos si ya tiene una mesa con ese numero
      const existingTable = await Table.findAll({
        where: {
          restaurant_id: restaurantID,
          number: body.number,
        },
      });

      if (existingTable[0]) {
        return {
          code: 400,
          error: { number: "Ya existe una mesa con ese numero" },
          ok: false,
        };
      }

      //si no existe la mesa se crea
      const newTable = await Table.create({
        number: body.number,
        restaurant_id: restaurantID,
      });

      return { code: 200, data: newTable, ok: true };
    } catch (e) {
      throw new Error(e);
    }
  },

  async deleteTableById(req) {
    const { tableID } = req.params;

    try {
      const deleted = await Table.destroy({ where: { id: tableID } });
      return { code: 200, data: deleted, ok: true };
    } catch (e) {
      console.log("ERROR destruyendo la mesa:", e);
    }
  },
};

export default tablesService;
