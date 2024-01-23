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
      `insert into ${this.table} (social_security_number, income_proof_url, photo_video_permission_url, outing_permission_url) values (?, ?, ?, ?)`,
      [
        administrative.socialSecurityNumber,
        administrative.incomeProofUrl,
        administrative.photoVideoPermissionUrl,
        administrative.outingPermissionUrl,
      ]
    );

    return result.insertId;
  }

  async update(administrative, administrativeId) {
    const [result] = await this.database.query(
      `update ${this.table} set social_security_number = ?, income_proof_url = ?, photo_video_permission_url = ?, outing_permission_url = ? WHERE id = ?`,
      [
        administrative.socialSecurityNumber,
        administrative.incomeProofUrl,
        administrative.photoVideoPermissionUrl,
        administrative.outingPermissionUrl,
        administrativeId,
      ]
    );

    return result.affectedRows;
  }
}

module.exports = AdministrativeManager;
