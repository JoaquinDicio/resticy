import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
<<<<<<< HEAD
import sequelize from "./database.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

=======
import itemsRouter from "./routes/items.routes.js";
import ordersRouter from "./routes/orders.routes.js";

const app = express();
app.use(express.json());
>>>>>>> 5a3ba83726c1dd325d0e04fc7a1f55f99f99cf02
configDotenv();

app.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);
<<<<<<< HEAD

// ======= PARA TESTEAR CONEXION CON BASE DE DATOS ========

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

app.get("/test-connection", testDatabaseConnection);
=======
app.use(itemsRouter);
app.use(ordersRouter);
>>>>>>> 5a3ba83726c1dd325d0e04fc7a1f55f99f99cf02
