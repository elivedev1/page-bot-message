import express from "express";

import {
  postWebhook,
  getWebhook,
  getHomePage,
  setupProfile,
} from "../controllers/HomeController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);

  router.post("/setup-profile", setupProfile);

  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  router.get("/hello", (req, res) => {
    res.send("hello");
  });

  return app.use("/", router);
};
export default initWebRoutes;
