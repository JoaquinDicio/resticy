import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";
import authRouter from "./routes/auth.routes.js";
import itemsRouter from "./routes/items.routes.js";
import ordersRouter from "./routes/orders.routes.js";

const app = express();
const server = http.createServer(app); // crea un servidor http
const io = new SocketServer(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(express.json());
app.use(cors());
configDotenv();

server.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);
app.use(itemsRouter);
app.use(ordersRouter);

export { io };
