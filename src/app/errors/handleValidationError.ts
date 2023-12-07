import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.name,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSource,
  };
};

export default handleValidationError;
