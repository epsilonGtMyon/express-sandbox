import express from "express";
import { checkSchema } from "express-validator";
import {
  required,
  maxLength,
} from "../../common/validation/validators/index.js";
import { handleValidationResult } from "../../common/validation/handleValidationResult.js";

import * as sandbox01 from "./sandbox01Controller.js";

const router = express.Router();

router.get("/", sandbox01.index);
router.get("/findUsers", sandbox01.findUsers);

router.post(
  "/register",
  checkSchema(
    {
      name: {
        required: {
          custom: required.create(),
        },
        maxLength: {
          custom: maxLength.create({ max: 5 }),
        },
      },
    },
    ["body"]
  ),
  handleValidationResult,
  sandbox01.register
);

function setup(app) {
  app.use(`/sandbox01`, router);
}

export default {
  setup,
};
