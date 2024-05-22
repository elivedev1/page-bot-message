import express from "express";
import bodyParser from "body-parser";

import { configViewEngine } from "./configs/viewEngine";
import { initWebRoutes } from "./routes/web";
let app = express();

configViewEngine(app);

initWebRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App is running at port " + port);
});
