import express from "express";
import { configDotenv } from "dotenv";
import intializeModels from "./models/index.js";
import cors from "cors";
import http from "http";
import sequelize from "./database.js";
import { Server as SocketServer } from "socket.io";
import authRouter from "./routes/auth.routes.js";
import itemsRouter from "./routes/items.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import tablesRouter from "./routes/tables.routes.js";
import restaurantsRouter from "./routes/restaurants.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import seedRoles from "./seeders/seedRoles.js";

const app = express();

//enlaza la base de datos e inicializa los modelos
intializeModels();
seedRoles();
sequelize.sync({ alter: true });

const server = http.createServer(app); // crea un servidor http
const io = new SocketServer(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors());
app.use(express.json());
configDotenv();

server.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);
app.use(itemsRouter);
app.use(ordersRouter);
app.use(tablesRouter);
app.use(restaurantsRouter);
app.use(paymentRouter);

app.use("/uploads", express.static("public/uploads"));

export { io };
