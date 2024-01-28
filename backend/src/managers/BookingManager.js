const AbstractManager = require("./AbstractManager");

class BookingManager extends AbstractManager {
  constructor() {
    super({ table: "booking" });
  }

  async readByChildrenId(childrenId) {
    const [rows] = await this.database.query(
      `
      SELECT
        date.id AS date_id,
        booking.id AS booking_id,
        date.start_date,
        date.end_date,
        nursery.name,
        upload.url AS picture_url
      FROM booking
      JOIN date ON booking.id = date.booking_id
      JOIN nursery ON booking.nursery_id = nursery.id
      JOIN upload ON upload.id = nursery.picture_upload_id
      WHERE booking.children_id = ?
      `,
      [childrenId]
    );
    return rows;
  }
  async readByNurseryId(nurseryId) {
    const [rows] = await this.database.query(
      `
      SELECT
        date.id AS date_id,
        booking.id AS booking_id,
        date.start_date,
        date.end_date,
        children.firstname AS children_firstname, children.is_walking as children_is_walking, children.doctor AS children_doctor,
        parent.firstname AS parent_firstname, parent.lastname AS parent_lastname, parent.phone as parent_phone
      FROM booking
      JOIN date ON booking.id = date.booking_id
      JOIN children ON booking.children_id = children.id
      JOIN parent ON children.parent_id = parent.id
      JOIN upload ON upload.id = parent.avatar_upload_id
      WHERE booking.nursery_id = ?
      `,
      [nurseryId]
    );
    
    return rows;
  }


  async create(booking) {
    const [result] = await this.database.query(
      `insert into ${this.table} (children_id, nursery_id) values (?, ?)`,
      [booking.childrenId, booking.nurseryId]
    );

    const bookingId = result.insertId;

    const [results2] = await this.database.query(
      `insert into date (booking_id, start_date, end_date) values (?, ?, ?)`,
      [bookingId, booking.startDate, booking.endDate]
    );
    return results2.insertId;
  }


  // Est ce que j'ai besoin de mettre à jour une réservation?
  // async update(booking, bookingId) {
  //   const [result] = await this.database.query(
  //     `update ${this.table} set booked_at = ? WHERE id = ?`,
  //     [booking.booked_at, bookingId]
  //   );

  //   return result.affectedRows;
  // }

  async delete(bookingId) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [bookingId]
    );

    return result.affectedRows;
  }
}

module.exports = BookingManager;
