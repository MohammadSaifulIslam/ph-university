import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSource,
  };
};

export default handleCastError;
