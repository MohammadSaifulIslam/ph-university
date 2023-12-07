import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: 'Validation error',
    errorSource: err?.issues?.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    }),
  };
};

export default zodErrorHandler;
