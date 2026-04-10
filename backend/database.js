import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default sequalize;
