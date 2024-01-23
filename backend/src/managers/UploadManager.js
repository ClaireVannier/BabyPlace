const AbstractManager = require("./AbstractManager");

class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "administrative" });
  }

  async createIncome(incomeFile) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (income_proof_url) VALUES (?)`,
      [incomeFile]
    );
  }
}

module.exports = UploadManager;
