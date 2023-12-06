/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Someting went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Someting went wrong!',
    },
  ];

  const zodErrorHandler = (err: ZodError) => {
    return {
      statusCode: 400,
      message: 'Validation error',
      errorSource: err?.issues?.map((issue) => {
        return {
          path: issue?.path[issue?.path?.length - 1],
          message: issue?.message,
        };
      }),
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
  });
};

export default globalErrorHandler;
