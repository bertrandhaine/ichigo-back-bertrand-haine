import { StatusCodes } from 'http-status-codes';

export interface IAppError extends Error {
  statusCode: StatusCodes;
  message: string;
  isAppError: boolean;
}

export interface IAppErrorOptions {
  statusCode?: StatusCodes;
  message: string;
}

class AppError extends Error implements IAppError {
  public statusCode: StatusCodes;
  public isAppError = true;

  constructor({ statusCode, message }: IAppErrorOptions) {
    super(message);
    this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}

/**
 * AppError builder function
 * @param args Error arguments
 */
export function buildError(args: IAppErrorOptions): IAppError {
  return new AppError(args);
}
