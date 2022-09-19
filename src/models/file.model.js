const sql = require("../config/db.js");

const File = function (file) {
  this.senderId = file.senderId;
  this.fileType = file.fileType;
  this.receiverId = file.receiverId;
  this.isPayable = file.isPayable;
};

File.create = (file, result) => {
  sql.query("INSERT INTO file SET ?", file, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
    }

    console.log("created file: ", { id: res.insertId, ...file });
    result(null, { id: res.insertId, ...file });
  });
};

File.delete = (fileId) => {
  sql.query("DELETE FROM file WHERE fileId = ?", fileId, (err, res) => {
    if (err) {
      console.error("error: ", err);
    }

    console.log("deleted file: ", { id: fileId });
  });
};

File.findAll = (query, result) => {
  const parameters = [];
  Object.keys(query).forEach((queryKey) => {
    conditions.push(`? = ?`);
    parameters.push(queryKey)
    parameters.push(query[queryKey]);
  });

  const performQuery = (query, values) => {
    sql.query(query, values, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found files: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  if (parameters.length > 0) {
    performQuery(
      `
      SELECT senderId, receiverId, fileType, isPayable, isPaid
      FROM file
      WHERE ${parameters.join(" AND ")}`,
      values
    );
  } else {
    performQuery(`
      SELECT senderId, receiverId, fileType, isPayable, isPaid
      FROM file
    `);
  }
};

File.getContent = (fileId, result) => {
  sql.query(
    `
    SELECT \`blob\`, isPayable, isPaid FROM fileContent fc
    LEFT JOIN file f ON fc.fileId = f.fileId
    WHERE f.fileId = ?
  `,
    fileId,
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        result({ kind: "not_found" }, null);
        return;
      }

      if (res[0].isPayable && !res[0].isPaid) {
        result({ kind: "permission_denied" }, null);
        return;
      }

      console.log(`Fetched content for id ${fileId}`);
      result(null, res[0].blob.toString());
    }
  );
};

File.markPaid = (fileId, result) => {
  sql.query(
    `
    UPDATE file SET isPaid = TRUE
    WHERE fileId = ?
  `,
    fileId,
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }

      console.log(`content paid for id ${fileId}`);
      result(null, { id: fileId, isPaid: true });
    }
  );
};

module.exports = File;