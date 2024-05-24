import express from "express";

import {
  postWebhook,
  getWebhook,
  getHomePage,
  setupProfile,
  setupPersistantMenu,
  handleReserveTable,
  handlePostrReserveTable,
} from "../controllers/HomeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);

  router.post("/setup-profile", setupProfile);
  router.post("/setup-persistant-menu", setupPersistantMenu);

  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  router.get("/reserve-table", handleReserveTable);

  router.get("/reserve-table-ajax", handlePostrReserveTable);

  return app.use("/", router);
};
export default initWebRoutes;
