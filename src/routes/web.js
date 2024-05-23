import express from "express";

import {
  postWebhook,
  getWebhook,
  getHomePage,
  setupProfile,
  setupPersistantMenu,
  handleReserveTable,
} from "../controllers/HomeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);

  router.post("/setup-profile", setupProfile);
  router.post("/setup-persistant-menu", setupPersistantMenu);

  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  router.get("/hello", (req, res) => {
    res.send("hello");
  });

  router.get("/reserve-table", handleReserveTable);

  return app.use("/", router);
};
export default initWebRoutes;
