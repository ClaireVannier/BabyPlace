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
      `insert into ${this.table} (name, address, phone, picture_url, description, outdoor_space, homemade_meals, developmental_activities, musical_activities, capacity, time_slot) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nursery.name,
        nursery.address,
        nursery.phone,
        nursery.pictureUrl,
        nursery.description,
        nursery.outdoorSpace,
        nursery.homemadeMeals,
        nursery.developmentalActivities,
        nursery.musicalActivities,
        nursery.capacity,
        nursery.timeSlot,
      ]
    );
    return result.insertId;
  }

  async update(nursery, nurseryId) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, address = ?, phone = ?, picture_url = ?, description = ?, outdoor_space = ?, homemade_meals = ?, developmental_activities = ?, musical_activities = ?, capacity = ?, time_slot = ? WHERE id = ?`,
      [
        nursery.name,
        nursery.address,
        nursery.phone,
        nursery.pictureUrl,
        nursery.description,
        nursery.outdoorSpace,
        nursery.homemadeMeals,
        nursery.developmentalActivities,
        nursery.musicalActivities,
        nursery.capacity,
        nursery.timeSlot,
        nurseryId,
      ]
    );

    return result.affectedRows;
  }
}

module.exports = NurseryManager;
