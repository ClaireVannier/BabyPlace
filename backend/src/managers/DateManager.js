const AbstractManager = require("./AbstractManager");

class dateManager extends AbstractManager {
  constructor() {
    super({ table: "date" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(date) {
    const [result] = await this.database.query(
      `insert into ${this.table} (booking_id, start_date, end_date) values (?, ?, ?)`,
      [date.bookingId, date.startDate, date.endDate]
    );

    return result.insertId;
  }

  async update(date, dateId) {
    const [result] = await this.database.query(
      `update ${this.table} set booking_id = ?, start_date = ?, end_date = ? WHERE id = ?`,
      [date.bookingId, date.startDate, date.endDate, dateId]
    );

    return result.affectedRows;
  }

  async delete(date) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [date]
    );

    return result.affectedRows;
  }
}

module.exports = dateManager;
