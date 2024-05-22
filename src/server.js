import express from "express";
import bodyParser from "body-parser";

import configViewEngine from "./configs/viewEngine.js";

import initWebRoutes from "./routes/web.js";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App is running at port " + port);
});
