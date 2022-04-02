import { StatusCodes } from 'http-status-codes';
import { buildError, IAppError } from '../../../core/buildError';

export default (): IAppError =>
  buildError({
    message: 'An error happened with your endpoint. Please try again later.',
    statusCode: StatusCodes.SERVICE_UNAVAILABLE,
  });
