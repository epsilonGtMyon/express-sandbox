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
  MaxLength,
  ValidateNested,
} from "class-validator";

class User {
  @MaxLength(4)
  firstName!: string;

  @MaxLength(4)
  familyName!: string;
}

class Post {
  @ValidateNested()
  user!: User;
}

async function main() {
  const user = new User();
  user.firstName = "123456";
  user.familyName = "567890";

  const post = new Post();
  post.user = user;

  const errors = await validate(post, {
    validationError: {
      target: false,
    },
  });
  

  for(const error of errors) {
    // error.childrenの中にネストした状態でエラーの情報が入っている
    console.log(error)

  }
}

main();
