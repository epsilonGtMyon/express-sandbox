import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const port = 3000
const app = express();

app.use(
  "/backend1",
  createProxyMiddleware({
    target: "http://localhost:20081",
    changeOrigin: true,
  })
);

app.use(
  "/backend2",
  createProxyMiddleware({
    target: "http://localhost:20082",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  console.log("================");
  console.log("[headers]");
  console.log(req.headers);
  console.log("[cookies]");
  console.log(req.cookies);

  res.send({
    value: `hello: ${port}`,
  });
});

app.listen(port);
