import "reflect-metadata";

import {
  validate,
  MaxLength,
} from "class-validator";

export class Post {
  @MaxLength(5, {
    each: true,//配列,set,mapの場合はeachでそれぞれできるらしい
  })
  tags!: string[];
}


async function main() {
  const post = new Post()
  post.tags = [
    "123456",
    "1234",
    "1234",
  ]

  const errors = await validate(post, {
    validationError: {
      target: false,
    },
  });

  // エラーメッセージはみにくい
  console.log(errors)
}

main()