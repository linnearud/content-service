module.exports = (app) => {
  const file = require("../controllers/file.controller.js");

  var router = require("express").Router();

  router.post("/files", file.create);

  app.use("/api/sender", router);
};