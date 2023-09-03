import "reflect-metadata";

import { ValidateNested, ValidationError, validate } from "class-validator";

import { Required } from "./validator/required";
import { HalfAlphaNum } from "./validator/halfAlphaNum";
import { MaxLength } from "./validator/maxLength";

class Sample01 {
  @Required()
  value01!: string;

  @HalfAlphaNum()
  value02!: string;

  @MaxLength(5)
  value03!: string;

  public static create(value01: string, value02: string, value03: string) {
    const sample1 = new Sample01();

    sample1.value01 = value01;
    sample1.value02 = value02;
    sample1.value03 = value03;
    return sample1;
  }
}

class Sample01Container {
  @Required()
  code01!: string;

  @ValidateNested()
  sample01!: Sample01;

  @ValidateNested()
  samples!: Sample01[];

  public static create(...samples: Sample01[]) {
    const container = new Sample01Container();
    container.samples = samples;
    return container;
  }
}

// --------
// 階層状 のエラーメッセージをフラットに加工
// ここは実際のアプリの要件次第ではある

type MyErrorMessage = Pick<
  ValidationError,
  "property" | "constraints" | "value"
>;

function toFlatError(
  errors: ValidationError[],
  prefix: string = ""
): MyErrorMessage[] {
  const flatErrors: MyErrorMessage[] = [];

  for (const error of errors) {
    // プロパティ名をフラットにするために上の階層のモノをプレフィックスとする。
    let flatProperty = "";
    if (/^[0-9]+$/.test(error.property)) {
      flatProperty = `${prefix}[${error.property}]`;
    } else {
      if (prefix !== "") {
        flatProperty = `${prefix}.`;
      }
      flatProperty += error.property;
    }

    // ---------
    // 自分の階層にメッセージがあればそれを追加

    if (error.constraints != null) {
      flatErrors.push({
        property: flatProperty,
        constraints: error.constraints,
        value: error.value,
      });
    }

    // ---------
    // 子の階層にメッセージがあればプレフィックスとして与えて再帰で呼び出してメッセージをフラットにする

    if (error.children != null) {
      flatErrors.push(...toFlatError(error.children, flatProperty));
    }
  }

  return flatErrors;
}

async function main() {
  const errors1 = await validate(Sample01.create("", "あ", "123456"), {
    validationError: {
      target: false,
    },
  });
  // console.log("[validate1]", errors1);
  console.log("[validate1]", toFlatError(errors1));

  //----------------
  const sample2 = Sample01Container.create(
    Sample01.create("", "あ", "123456"),
    Sample01.create("a", "a", "12345"),
    Sample01.create("a", "a", "123456")
  );
  sample2.sample01 = Sample01.create("", "あ", "123456");

  const errors2 = await validate(sample2, {
    validationError: {
      target: false,
    },
  });
  //console.log("[validate2]", JSON.stringify(errors2, null, "  "));
  console.log("[validate2]", toFlatError(errors2));

}

main();
