import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

function validateRequired(value: any) {
  if (value == null) {
    return false;
  }
  if (value === "") {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return true;
}

@ValidatorConstraint({ name: "required", async: false })
class RequiredConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments) {
    return validateRequired(value);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(validationArguments?: ValidationArguments) {
    return "必須です。";
  }
}

function Required(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RequiredConstraint,
    });
  };
}

export { validateRequired, RequiredConstraint, Required };
