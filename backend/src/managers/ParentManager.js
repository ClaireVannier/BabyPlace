const AbstractManager = require("./AbstractManager");

class ParentManager extends AbstractManager {
  constructor() {
    super({ table: "parent" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(parent) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, phone, avatar_upload_id, user_id) values (?, ?, ?, NULL, ?)`,
      [parent.firstname, parent.lastname, parent.phone, parent.userId]
    );

    return result.insertId;
  }

  async update(parent, parentId) {
    const [result] = await this.database.query(
      `update ${this.table} set phone = ? WHERE id = ?`,
      [parent.phone, parentId]
    );

    return result.affectedRows;
  }

  async setAdmininistrativeId(administrativeId, parentId) {
    const [result] = await this.database.query(
      `update ${this.table} set administrative_id = ? WHERE id = ?`,
      [administrativeId, parentId]
    );

    return result.affectedRows;
  }
}
module.exports = ParentManager;
