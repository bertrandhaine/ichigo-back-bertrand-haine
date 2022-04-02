import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAppError } from '../buildError';
import { RequestWithLogger } from './attachLogger.middleware';

/**
 * Error handling middleware. It catches AppError and parses it into proper format.
 */
export function appErrorHandlerMiddleware(
  error: IAppError,
  req: RequestWithLogger,
  res: Response,
  next: NextFunction,
): Response | void {
  // Handle SyntaxError when sending improper json body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((error as any).type && (error as any).type === 'entity.parse.failed') {
    req.logger.warn({ message: 'Improper body JSON payload' });

    return res.status(StatusCodes.BAD_REQUEST).send({
      message: 'Improper body JSON payload',
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'bad-body-json',
    });
  }

  if (error.isAppError) {
    const { statusCode, message } = error;

    req.logger.warn({
      message: 'Request finished with AppError',
      context: { message, statusCode, error },
    });

    return res.status(statusCode).send({
      error: {
        message,
      },
    });
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: 'Internal server error',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  next(error);
}
