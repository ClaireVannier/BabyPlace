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


  async getProfil(userId, isNursery) {
    // Création de l'objet "profil"
    const profil = {}

    
    if (isNursery) {
      // Récupérer la Nursery liée au user_id
      const [nurseryRows] = await this.database.query(
        `SELECT * FROM nursery WHERE user_id = ?`,
        [userId]
      );

      if (nurseryRows.length === 0) {
        profil.nursery = {};
      }
      // Ajout de l'objet "nursery" dans l'objet "profil"
      profil.nursery = nurseryRows[0];

    } else { 
      // Récupérer mon parent lié au user_id
      const [parentRows] = await this.database.query(
        `SELECT * FROM parent WHERE user_id = ?`,
        [userId]
      );

      if (parentRows.length === 0) {
        profil.parent = undefined;
      }
      // Ajout de l'objet "parent" dans l'objet "profil"
      profil.parent = parentRows[0];

      // Récupérer les enfants liés au parent_id
      const [childrenRows] = await this.database.query(
        `SELECT * FROM children WHERE parent_id = ?`,
        [profil.parent.id]
      );

      if (childrenRows.length === 0) {
        profil.children = [];
      }
      // Ajout du tableau "children" dans l'objet "profil
      profil.children = childrenRows;
    }
    return profil;
  }










  async addAvatar(userId, avatarId) {
    await this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatarId, userId]
    );
  }
}

module.exports = UserManager;
