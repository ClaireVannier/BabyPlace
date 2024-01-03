const AbstractManager = require("./AbstractManager");

class BookingManager extends AbstractManager {
  constructor() {
    super({ table: "booking" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(booking) {
    const date = new Date();
    const dateInDateTime = date
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    const [result] = await this.database.query(
      `insert into ${this.table} (booked_at, children_id, nursery_id) values (?, ?, ? )`,
      [dateInDateTime, booking.children_id, booking.nursery_id]
    );

    return result.insertId;
  }

  async update(booking, bookingId) {
    const [result] = await this.database.query(
      `update ${this.table} set booked_at = ? WHERE id = ?`,
      [booking.booked_at, bookingId]
    );

    return result.affectedRows;
  }

  async delete(bookingId) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [bookingId]
    );

    return result.affectedRows;
  }
}

module.exports = BookingManager;
