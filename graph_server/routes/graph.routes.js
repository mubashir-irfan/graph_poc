module.exports = (app) => {
  var router = require("express").Router();
  const graphController = require('../controllers/graph.controller');
  router.get("/ranks", graphController.calculateRanks);

  app.use("/api/graph/", router);
};