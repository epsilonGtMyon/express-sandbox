const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home/index");
});
//---------------
const sandbox01 = require("./src/sandbox01/index.js");
const sandbox02 = require("./src/sandbox02/index.js");
const sandbox03 = require("./src/sandbox03/index.js");
const sandbox04 = require("./src/sandbox04/index.js");
const sandbox05 = require("./src/sandbox05/index.js");
app.use("/sandbox01", sandbox01);
app.use("/sandbox02", sandbox02);
app.use("/sandbox03", sandbox03);
app.use("/sandbox04", sandbox04);
app.use("/sandbox05", sandbox05);

const port = 3000;
app.listen(port, () => {
  console.log(`started = ${port}`);
});
