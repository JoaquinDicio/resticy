import express from "express";
import http from "http";
import cors from "cors";
import { mountRouters } from "./routes/index.js";
import { Server as Socket } from "socket.io";
import initModels from "./models/index.js";
import sequalize from "./database.js";
import seedRoles from "./seeders/seedRoles.js";

const app = express();

//middlewares
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());

app.use("/uploads", express.static("public/uploads"));

mountRouters(app);

//configuracion inicial de la base datos
async function initDatabase() {
  initModels();
  await sequalize.sync({ alter: true });
  await seedRoles();
}

initDatabase();

//inicializa el servidor y el socket
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server running at", process.env.PORT);
});

const io = new Socket(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export { io };
