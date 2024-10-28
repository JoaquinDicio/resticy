import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
import sequelize from "./database.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

configDotenv();

app.listen(process.env.PORT, () =>
  console.log("Server running at", process.env.PORT)
);

app.use(authRouter);

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
