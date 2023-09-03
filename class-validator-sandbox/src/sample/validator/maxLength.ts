import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

function validateMaxLength(value: string | null | undefined, max: number) {
  if (value == null || value === "") {
    return true;
  }

  return [...value].length <= max;
}

@ValidatorConstraint({ name: "maxLength", async: false })
class MaxLengthConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | null | undefined,
    validationArguments?: ValidationArguments
  ) {
    const max: number = validationArguments?.constraints[0];
    return validateMaxLength(value, max);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(validationArguments?: ValidationArguments) {
    const max: number = validationArguments?.constraints[0];
    return `${max}文字以内で入力してください。`;
  }
}

function MaxLength(max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [max],
      validator: MaxLengthConstraint,
    });
  };
}

export { validateMaxLength, MaxLengthConstraint, MaxLength };
