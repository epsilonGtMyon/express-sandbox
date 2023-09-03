import "reflect-metadata";
import {
  validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from "class-validator";

@ValidatorConstraint({ name: "myAlphaNum", async: false })
class MyAlphaNum implements ValidatorConstraintInterface {
  /**
   * Method to be called to perform custom validation over given value.
   */
  validate(value: string, validationArguments?: ValidationArguments) {
    if (value === "") {
      return true;
    }
    return /^[a-zA-Z0-9]+$/.test(value);
  }
  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage?(args?: ValidationArguments) {
    console.log(args);
    return "半角英数で入力してください。";
  }
}

class Post {
  //Validateの第2引数は ValidationArgumentsのconstraintsで受け取れる
  @Validate(MyAlphaNum, [{ hoge: "a" }])
  hogeCode!: string;
}

async function main() {
  const post = new Post();
  post.hogeCode = "123ABC#";

  const errors = await validate(post, {
    validationError: {
      target: false,
    },
  });
  console.log(errors);
}

main();
