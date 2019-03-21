
export class ArgumentNullException extends Error {

  constructor(parameter: string) {
    super(`Value cannot be null. Parameter name: ${parameter}`);
  }
}
