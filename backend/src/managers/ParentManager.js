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
      `insert into ${this.table} (firstname, lastname, phone) values (?, ?, ?)`,
      [parent.firstname, parent.lastname, parent.phone]
    );

    return result.insertId;
  }

  async update(parent, parentId) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, phone = ? WHERE id = ?`,
      [parent.firstname, parent.lastname, parent.phone, parentId]
    );

    return result.affectedRows;
  }
}
module.exports = ParentManager;
