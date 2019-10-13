import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import app from "./app";

createConnection({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  username: "root",
  password: "root",
  database: "session",
  synchronize: true,
  logging: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [User],
  authSource: "admin"
}).then(async connection => {
  app.listen(app.get("port"), () => {
    console.log(`Express server is running`);
  });
});
