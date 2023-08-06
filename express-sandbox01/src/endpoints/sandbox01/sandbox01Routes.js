import express from "express";
import * as sandbox01 from "./sandbox01Controller.js";

const router = express.Router();

router.get("/", sandbox01.index);
router.get("/findUsers", sandbox01.findUsers);

function setup(app) {
  app.use("/sandbox01", router);
}

export default {
  setup,
};
