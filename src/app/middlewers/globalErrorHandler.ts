/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import zodErrorHandler from '../errors/zodErrorHadler';
import { TErrorSource } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Someting went wrong!';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Someting went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.message === 'ValidationError') {
    console.log('dfjasfj');
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
  });
};

export default globalErrorHandler;
