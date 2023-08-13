import "dotenv/config";

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import log4js from "log4js";

log4js.configure("./log4js.json");
const logger = log4js.getLogger("index");

const app = express();

//---------------------------
// 使用するテンプレートエンジンの指定
app.set("view engine", "ejs");
//---------------------------
// middleware

app.use(morgan("dev"));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "'unsafe-eval'", "unpkg.com"]
    },
  },
}));
app.use(cookieParser());
app.use(
  session({
    // とりあえずテキトーに
    secret: "keyboard cat",
    name: `my-session`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static("public"));
app.use(express.json());

//---------------------------
// helloworld
app.get("/", (req, res) => {
  res.render("home/index");
});

//---------------------------
// routes
import sandbox01Routes from "./src/endpoints/sandbox01/sandbox01Routes.js";
sandbox01Routes.setup(app);

const port = Number(process.env.port ?? "80");
app.listen(port, () => {
  logger.log(`started: http://localhost:${port}`);
});
