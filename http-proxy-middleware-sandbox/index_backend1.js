import express from "express";
import cookieParser from "cookie-parser";

const port = 20081;

const app = express();

app.use(cookieParser());

app.get("/backend1", (req, res) => {
  console.log("================");
  console.log("[headers]");
  console.log(req.headers);
  console.log("[cookies]");
  console.log(req.cookies);

  const cookieName = `c${port}`
  if (req.cookies == undefined || req.cookies[cookieName] == undefined) {
    res.cookie(cookieName, `cccc:${Date.now()}`, {
      maxAge: 60000,
      httpOnly: true,
    });
  }

  res.send({
    value: `hello: ${port}`,
  });
});

app.listen(port, () => {
  console.info(`started port = ${port}`);
});
