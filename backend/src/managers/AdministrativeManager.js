const AbstractManager = require("./AbstractManager");

class AdministrativeManager extends AbstractManager {
  constructor() {
    super({ table: "administrative" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(administrative) {
    const [result] = await this.database.query(
      `insert into ${this.table} (social_security_number, income_proof_upload_id, photo_video_permission_upload_id, outing_permission_upload_id) values (?, NULL, NULL, NULL)`,
      [administrative.socialSecurityNumber]
    );

    return result.insertId;
  }
}

module.exports = AdministrativeManager;
