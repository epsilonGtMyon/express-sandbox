const express = require("express");
const { body, checkSchema } = require("express-validator");

const {
  handleValidationResult,
} = require("./validation/handle-validation-result");

const { required, maxLength } = require("./validation/validators/index");
console.log(required);

//--------------------
const router = express.Router();

router.get("/", (req, res) => {
  res.render("sandbox05/index", { title: "sandbox05" });
});

// https://express-validator.github.io/docs/guides/customizing#the-expressvalidator-class
// このやり方だとバリデーションにオプションが渡せない？ので汎用性がなさそう
// なので代わりの方法としてcustomに対して独自のバリデーションを渡すようにする。

router.post(
  "/post1",
  body("scalar01")
    .custom(required.create())
    .custom(maxLength.create({ max: 5 })),
  body("department.departmentName")
    .custom(required.create())
    .custom(maxLength.create({ max: 5 })),
  handleValidationResult,
  (req, res) => {
    res.send({
      value: "OK",
    });
  }
);

router.post(
  "/post2",
  checkSchema({
    scalar01: {
      required: {
        custom: required.create(),
      },
      maxLength: {
        custom: maxLength.create({ max: 6 }),
      },
    },
    'department.departmentName': {
      required: {
        custom: required.create(),
      },
      maxLength: {
        custom: maxLength.create({ max: 6 }),
      },
    }
  }),

  handleValidationResult,
  (req, res) => {
    res.send({
      value: "OK",
    });
  }
);

module.exports = router;
