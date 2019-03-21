export class NotImplementedException extends Error{

  constructor(message?: string) {
    super(message || 'Not implemented');
  }
}
