import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

function validateHalfAlphaNum(value: string | null | undefined) {
  if (value == null || value === "") {
    return true;
  }

  return /^[a-zA-Z0-9]*$/.test(value);
}

@ValidatorConstraint({ name: "halfAlphaNum", async: false })
class HalfAlphaNumConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | null | undefined,
    validationArguments?: ValidationArguments
  ) {
    return validateHalfAlphaNum(value);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(validationArguments?: ValidationArguments) {
    return "半角英数で入力してください。";
  }
}

function HalfAlphaNum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HalfAlphaNumConstraint,
    });
  };
}

export { validateHalfAlphaNum, HalfAlphaNumConstraint, HalfAlphaNum };
