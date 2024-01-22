const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

const { compare, hash: _hash } = bcrypt;

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    return UserManager.hashPassword(user.password).then((hash) => {
      return this.database.query(
        `insert into ${this.table} (email, password, is_nursery) values (?, ?, ?)`,
        [user.email, hash, user.is_nursery]
      );
    });
  }

  async login({ email, password }) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email like ?`,
      [email]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];

    const result = await compare(password, user.password);

    return result ? user : undefined;
  }

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, is_nursery AS isNursery FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  addAvatar(userId, avatarId) {
    return this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatarId, userId]
    );
  }

  static hashPassword(password, workFactor = 5) {
    return _hash(password, workFactor);
  }
}

module.exports = UserManager;
