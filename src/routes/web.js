import express from "express";

import {
  postWebhook,
  getWebhook,
  getHomePage,
  setupProfile,
  setupPersistantMenu,
  handleReserveTable,
  handlePostReserveTable,
} from "../controllers/HomeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);

  router.post("/setup-profile", setupProfile);
  router.post("/setup-persistant-menu", setupPersistantMenu);

  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  router.get("/reserve-table/:senderId", handleReserveTable);

  router.get("/reserve-table-ajax", handlePostReserveTable);

  return app.use("/", router);
};
export default initWebRoutes;
