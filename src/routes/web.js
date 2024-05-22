import express from "express";

import { postWebhook, getWebhook } from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("hello");
  });

  router.post("/webhook", postWebhook);
  router.get("/webhook", getWebhook);

  router.get("/hello", (req, res) => {
    res.send("hello");
  });

  return app.use("/", router);
};
export default initWebRoutes;
