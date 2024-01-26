const AbstractManager = require("./AbstractManager");
const generateUUID = require("../utils/uuid-generator");
const renameFile = require("../utils/rename-file");

class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "upload" });
  }

  async createIncome(req, id) {
    const { originalname, filename } = req.file;
    const newName = `${generateUUID()}-${originalname}`;

    try {
      await renameFile(filename, newName);

      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (url) VALUES (?)`,
        [newName]
      );

      const [result2] = await this.database.query(
        `UPDATE administrative SET income_proof_upload_id = ? WHERE id = ?`,
        [result.insertId, id]
      );

      return result2;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createPhoto(req, id) {
    const { originalname, filename } = req.file;
    const newName = `${generateUUID()}-${originalname}`;

    try {
      await renameFile(filename, newName);

      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (url) VALUES (?)`,
        [newName]
      );

      const [result2] = await this.database.query(
        `UPDATE administrative SET photo_video_permission_upload_id = ? WHERE id = ?`,
        [result.insertId, id]
      );

      return result2;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createOutsitePermission(req, id) {
    const { originalname, filename } = req.file;
    const newName = `${generateUUID()}-${originalname}`;

    try {
      await renameFile(filename, newName);

      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (url) VALUES (?)`,
        [newName]
      );

      const [result2] = await this.database.query(
        `UPDATE administrative SET outing_permission_upload_id = ? WHERE id = ?`,
        [result.insertId, id]
      );

      return result2;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createNurseryPicture(req, nurseryIdToUpdate) {
    const { originalname, filename } = req.file;
    const newName = `${generateUUID()}-${originalname}`;

    try {
      await renameFile(filename, newName);

      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (url) VALUES (?)`,
        [newName]
      );

      console.log(nurseryIdToUpdate)
      const [result2] = await this.database.query(
        `UPDATE nursery SET picture_upload_id = ? WHERE id = ?`,
        [result.insertId, nurseryIdToUpdate]
      );

      return result2;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = UploadManager;
