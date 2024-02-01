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
        booking.id AS booking_id, booking.statut,
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
        booking.id AS booking_id, booking.statut,
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

  async checkAvailability(nurseryId, datesToCheck) {

    // Obtenir la capacité de la crèche indépendamment des réservations
    const [capacityResult] = await this.database.query(
      'SELECT capacity FROM nursery WHERE id = ?',
      [nurseryId]
    );
    const capacity = capacityResult[0] ? capacityResult[0].capacity : null;

    // Obtenir le nombre de réservations pour les dates spécifiées
    const [bookingResult] = await this.database.query(
      `SELECT COUNT(*) as overlappingBookings 
        FROM booking 
        JOIN date ON booking.id = date.booking_id
        WHERE booking.nursery_id = ? 
          AND (
            (date.start_date <= ? AND date.end_date >= ?) OR
            (date.start_date <= ? AND date.end_date >= ?) OR
            (? <= date.start_date AND ? >= date.end_date)
          )`,
      [
        nurseryId,
        datesToCheck.startDate, datesToCheck.startDate,
        datesToCheck.endDate, datesToCheck.endDate,
        datesToCheck.startDate, datesToCheck.endDate
      ]
    );

    return { overlappingBookings: bookingResult[0].overlappingBookings, capacity };
  }


  async create(booking) {
    const [result] = await this.database.query(
      `insert into ${this.table} (children_id, nursery_id, statut) values (?, ?, ?)`,
      [booking.childrenId, booking.nurseryId, booking.statut]
    );

    const bookingId = result.insertId;

    const [results2] = await this.database.query(
      `insert into date (booking_id, start_date, end_date) values (?, ?, ?)`,
      [bookingId, booking.startDate, booking.endDate]
    );
    return results2.insertId;
  }


  async update(booking, bookingId) {
    const [result] = await this.database.query(
      `update ${this.table} set statut = ? WHERE id = ?`,
      [booking.statut, bookingId]
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
