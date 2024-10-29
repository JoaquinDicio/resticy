import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import itemsRouter from "./routes/items.routes.js";
import ordersRouter from "./routes/orders.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
configDotenv();

app.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);
app.use(itemsRouter);
app.use(ordersRouter);
