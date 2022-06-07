import express from "express";
import cors from "cors";
import routes from "./routes";
const path = require("path");
console.log(path.resolve("config", "config.ts"));

//create app
const app = express();
//port to use
const PORT = 8000;
//configure express
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
routes(app);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
