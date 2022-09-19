module.exports = (app) => {
  const file = require("../controllers/file.controller.js");

  var router = require("express").Router();

  router.get("/files", file.findAll);
  router.get("/files/:id/content", file.getContent);
  router.post("/files/:id/payment", file.createPayment);

  app.use("/api/consumer", router);
};