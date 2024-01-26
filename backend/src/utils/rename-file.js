const fs = require("node:fs");

const renameFile = (filename, newName) => {
  return new Promise((resolve, reject) => {
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${newName}`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

module.exports = renameFile;
