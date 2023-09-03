import "reflect-metadata";

import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from "class-validator";

export class Post {
  @Length(10, 20)
  title!: string;

  @Contains("hello")
  text!: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsEmail()
  email!: string;

  @IsFQDN()
  site!: string;

  @IsDate()
  createDate!: Date;
}

async function main() {
  let post = new Post();
  post.title = "Hello"; // should not pass
  post.text = "this is a great post about hell world"; // should not pass
  post.rating = 11; // should not pass
  post.email = "google.com"; // should not pass
  post.site = "googlecom"; // should not pass

  const errors = await validate(post, {
    validationError: {
      target: false, // falseにするとバリデーション結果に 検証対象のオブジェクトが含まれなくなる
    },
  });
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
}

main();
