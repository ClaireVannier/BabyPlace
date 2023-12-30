const AbstractManager = require("./AbstractManager");

class NurseryManager extends AbstractManager {
  constructor() {
    super({ table: "nursery" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(nursery) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, address, phone, picture_url, description, outdoor_space, homemade_meals, developmental_activities, musical_activities) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nursery.name,
        nursery.address,
        nursery.phone,
        nursery.picture_url,
        nursery.description,
        nursery.outdoor_space,
        nursery.homemade_meals,
        nursery.developmental_activities,
        nursery.musical_activities,
      ]
    );
    return result.insertId;
  }

  async update(nursery, nurseryId) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, address = ?, phone = ?, picture_url = ?, description = ?, outdoor_space = ?, homemade_meals = ?, developmental_activities = ?, musical_activities = ? WHERE id = ?`,
      [
        nursery.name,
        nursery.address,
        nursery.phone,
        nursery.picture_url,
        nursery.description,
        nursery.outdoor_space,
        nursery.homemade_meals,
        nursery.developmental_activities,
        nursery.musical_activities,
        nurseryId,
      ]
    );

    return result.affectedRows;
  }
}

module.exports = NurseryManager;
