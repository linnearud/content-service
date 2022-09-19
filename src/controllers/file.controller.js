const fs = require("fs");
const FileContent = require("../models/file-content.model.js");
const File = require("../models/file.model.js");
const validation = require("../utils/validation.js");

exports.create = (req, res) => {
  const errorMessage = validation.validateForm(
    req,
    ["senderId", "fileType", "receiverId", "isPayable"],
    ["file"]
  );

  if (errorMessage) {
    res.status(400).send({
      message: errorMessage,
    });
    return;
  }

  const file = new File({
    senderId: req.fields.senderId,
    fileType: req.fields.fileType,
    receiverId: req.fields.receiverId,
    isPayable: req.fields.isPayable === "true",
  });

  File.create(file, (err, fileData) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error creating file",
      });
    else {
      const base64fileContent = fs.readFileSync(req.files.file.path, "base64");
      const fileContent = new FileContent({
        blob: base64fileContent,
        fileId: fileData.id,
      });

      FileContent.create(fileContent, (err, fileContentData) => {
        if (err) {
          File.delete(fileData.id);
          res.status(500).send({
            message: err.message || "Error creating file content",
          });
        } else res.send(fileData);
      });
    }
  });
};

exports.findAll = (req, res) => {
  File.findAll(req.query, (err, data) => {
    if (err)
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Not found" });
      } else {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving files.",
        });
      }
    else res.send(data);
  });
};

exports.getContent = (req, res) => {
  File.getContent(req.params.id, (err, data) => {
    if (err)
      if (err.kind === "not_found") {
        res.status(404).send({ message: "Not found" });
      } else if (err.kind === "permission_denied") {
        res.status(403).send({ message: "Permission denied" });
      } else {
        res.status(500).send({
          message: err.message || "Could not fetch file",
        });
      }
    else res.send(data);
  });
};

exports.createPayment = (req, res) => {
  // Payment stuff

  File.markPaid(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Could not mark paid",
      });
    } else res.send(data);
  });
};