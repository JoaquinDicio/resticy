import Table from "../models/Table.js";

const tablesService = {
  async getTablesByRestaurant(req) {
    try {
      const { user } = req;

      const tables = await Table.findAll({
        where: { restaurant_id: user.restaurantID },
      });

      return { code: 200, data: [...tables], ok: true };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteTableFromRestaurant() {},
  async addTableToRestaurant() {},
};

export default tablesService;
