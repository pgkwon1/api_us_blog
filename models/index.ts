import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
// eslint-disable-next-line import/prefer-default-export
export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
    models: [__dirname + "/models/*.model.ts"],
  }
);
