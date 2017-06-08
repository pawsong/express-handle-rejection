import { Handler, Request, Response, NextFunction } from 'express';

export default function handleRejection(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): Handler {
  return function handle(req: Request, res: Response, next: NextFunction) {
    return handler(req, res, next).catch(next);
  };
}
