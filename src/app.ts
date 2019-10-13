import "./lib/env";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import cookieParser from "cookie-parser";
import fileStore from "session-file-store";
import express from "express";

const app = express();
const FileStore = fileStore(session);

app.set("port", 9999);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(logger("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new FileStore({}),
    name: "sid",
    secret: process.env.SECRET_TOKEN as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === "production"
    }
  })
);

import indexRoute from "./controllers";
import userRoute from "./controllers/user";

app.use("/", indexRoute);
app.use("/user", userRoute);

export default app;
