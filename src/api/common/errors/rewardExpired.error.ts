import { StatusCodes } from 'http-status-codes';
import { buildError, IAppError } from '../../../core/buildError';

export default (): IAppError =>
  buildError({
    message: 'This reward is already expired',
    statusCode: StatusCodes.FORBIDDEN,
  });
