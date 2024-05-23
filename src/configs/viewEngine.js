import express from "express";
import path from "path";
import { __dirname } from "../utils.js";

let configViewEngine = (app) => {
  const publicPath = path.join(__dirname, "../src/public");
  const viewsPath = path.join(__dirname, "../src/views");

  console.log("Public path: ", publicPath);
  console.log("Views path: ", viewsPath);

  app.use(express.static(publicPath));

  app.set("view engine", "ejs");

  app.set("views", viewsPath);
};

export default configViewEngine;

//////////////////////////////////////////////////////////////////////

// import express from "express";

// let configViewEngine = (app) => {
//   app.use(express.static("./src/public"));

//   app.set("view engine", "ejs");

//   app.set("views", "./src/views");
// };

// export default configViewEngine;
