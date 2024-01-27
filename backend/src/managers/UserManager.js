const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

const { compare, hash: _hash } = bcrypt;

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  static hashPassword(password, workFactor = 5) {
    return _hash(password, workFactor);
  }

  async create(user, isNursery) {
    const hashedPassword = await UserManager.hashPassword(user.password);

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, is_nursery) VALUES (?, ?, ?)`,
      [user.email, hashedPassword, isNursery ? 1 : 0]
    );

    return result.insertId;
  }

  async login({ email, password }) {
    const [userRows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email LIKE ?`,
      [email]
    );

    if (userRows.length === 0) {
      return undefined;
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

    if (profilRows.length === 0) {
      return undefined;
    }

    const profil = profilRows[0];

    if (profil.is_nursery === 0) {
      const [parentRows] = await this.database.query(
        'SELECT * FROM parent WHERE user_id = ?',
        [profil.id]
      );
      return  parentRows.length > 0 ? parentRows[0] : undefined;
    } else {
      const [nurseryRows] = await this.database.query(
        'SELECT * FROM nursery WHERE user_id = ?',
        [profil.id]
      );
      return nurseryRows.length > 0 ? nurseryRows[0] : undefined;
    }
  }

  async addAvatar(userId, avatarId) {
    await this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatarId, userId]
    );
  }
}

module.exports = UserManager;
