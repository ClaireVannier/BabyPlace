const AbstractManager = require("./AbstractManager");

class ChildrenManager extends AbstractManager {
  constructor() {
    super({ table: "children" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(children) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, birth_date, is_walking, doctor, allergies) values (?, ?, ?, ?, ?)`,
      [
        children.firstname,
        children.birth_date,
        children.is_walking,
        children.doctor,
        children.allergies,
      ]
    );

    return result.insertId;
  }

  async update(children, childrenId) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, birth_date = ?, is_walking = ?, doctor = ?, allergies = ? WHERE id = ?`,
      [
        children.firstname,
        children.birth_date,
        children.is_walking,
        children.doctor,
        children.allergies,
        childrenId,
      ]
    );

    return result.affectedRows;
  }
}

module.exports = ChildrenManager;
