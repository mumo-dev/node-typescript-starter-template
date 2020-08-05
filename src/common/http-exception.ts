import { NOT_FOUND, BAD_REQUEST } from "http-status-codes";
import e from "cors";

export default class HttpException extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}


export class ResourceNotFoundException extends HttpException {
    constructor(message: string) {
        super(NOT_FOUND, message)
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(BAD_REQUEST, message)
    }
}

export class ValidationException extends HttpException {
    errors: any[];
  
    constructor(errors: any[]) {
      super(BAD_REQUEST, 'Input data validation failed')
      Object.setPrototypeOf(this, ValidationException.prototype);
      this.errors = errors;
    }
}
