const sql = require("../config/db.js");

const FileContent = function (fileContent) {
  this.blob = fileContent.blob;
  this.fileId = fileContent.fileId;
};

FileContent.create = (fileContent, result) => {
  sql.query("INSERT INTO fileContent SET ?", fileContent, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    console.log("created fileContent: ", { id: res.insertId, ...fileContent });
    result(null, { id: res.insertId, ...fileContent });
  });
};

module.exports = FileContent;