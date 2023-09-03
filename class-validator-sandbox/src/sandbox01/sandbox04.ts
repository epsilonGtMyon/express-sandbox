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
  ValidateIf,
} from "class-validator";

export class Post {

  @ValidateIf(x => !x.check) // 条件付きでチェックしたい場合
  @MaxLength(5)
  value01!: string;

  @ValidateIf(x => x.check) // 条件付きでチェックしたい場合
  @MaxLength(5)
  value02!: string;

  check: boolean = false;
}

async function main() {
  let post1 = new Post();
  post1.value01 = "123456";
  post1.value02 = "123456"
  post1.check = false;
  
  let post2 = new Post();
  post2.value01 = "123456";
  post2.value02 = "123456"
  post2.check = true;

  const errors1 = await validate(post1, {
    validationError: {
      target: false,
    },
  });
  
  const errors2 = await validate(post2, {
    validationError: {
      target: false,
    },
  });

  console.log(errors1)
  console.log("-------")
  console.log(errors2)
}


main();
