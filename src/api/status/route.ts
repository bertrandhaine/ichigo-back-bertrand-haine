import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response): Response => res.sendStatus(StatusCodes.OK);
