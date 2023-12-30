const AbstractManager = require("./AbstractManager");

class ParentManager extends AbstractManager {
  constructor() {
    super({ table: "parent" });
  }

  async create(parent) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, phone) values (?, ?, ?)`,
      [parent.firstname, parent.lastname, parent.phone]
    );

    return result.insertId;
  }
}

module.exports = ParentManager;
