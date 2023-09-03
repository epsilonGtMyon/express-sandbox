import "reflect-metadata";
import {
  validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "myAlphaNum", async: false })
class MyAlphaNumConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    if (value === "") {
      return true;
    }
    return /^[a-zA-Z0-9]+$/.test(value);
  }
  defaultMessage?(args?: ValidationArguments) {
    console.log(args);
    return "半角英数で入力してください。";
  }
}

// decorator
function MyAlphaNum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MyAlphaNumConstraint, // 直接関数を記述することもできるがクラスを書くこともできる。(こっちの形式のがよさそう)
    });
  };
}

class Post {
  @MyAlphaNum()
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
