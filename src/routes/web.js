import express from "express";

import homeController from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("hello");
  });

  router.post("/webhook", homeController.postWebhook);
  router.get("/webhook", homeController.getWebhook);

  router.get("/hello", (req, res) => {
    res.send("hello");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
