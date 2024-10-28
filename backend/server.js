import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
import itemsRouter from "./routes/items.routes.js";

const app = express();
app.use(express.json());
configDotenv();

app.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);
app.use(itemsRouter);
