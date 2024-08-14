import {
  isEmail,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isCpf } from "src/@shared/utils/is_cpf.utils";

@ValidatorConstraint({ name: "IsEmailOrCpf", async: false })
export class IsEmailOrCpfConstraint implements ValidatorConstraintInterface {
  validate(login: any, args: ValidationArguments) {
    if (!login) return false;

    const email = isEmail(login);
    const cpf = isCpf(login);
    return email || cpf;
  }
}

export function IsEmailOrCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailOrCpfConstraint,
    });
  };
}
