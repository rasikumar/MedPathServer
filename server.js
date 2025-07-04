import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes/router.js";
import connectDataBase from "./config/DBCofig.js";

dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
connectDataBase();
app.use("/api", router);

app.use(express.static(path.join(__dirname, "out")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "out", "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
