const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

const { compare, hash: _hash } = bcrypt;

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const hashedPassword = await UserManager.hashPassword(user.password);

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, is_nursery) VALUES (?, ?, ?)`,
      [user.email, hashedPassword, user.isNursery]
    );

    return result.insertId;
  }

  async login({ email, password }) {
    const [userRows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email LIKE ?`,
      [email]
    );

    if (userRows.length === 0) {
      return undefined; // L'utilisateur n'existe pas
    }

    const user = userRows[0];
    const passwordMatch = await compare(password, user.password);

    return passwordMatch ? user : undefined;
  }

  async getProfil(id) {
    const [profilRows] = await this.database.query(
      `SELECT id, email, is_nursery FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return profilRows.length > 0 ? profilRows[0] : undefined;
  }

  async addAvatar(userId, avatarId) {
    await this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatarId, userId]
    );
  }

  static hashPassword(password, workFactor = 5) {
    return _hash(password, workFactor);
  }
}

module.exports = UserManager;
