import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.models';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDB,
};
