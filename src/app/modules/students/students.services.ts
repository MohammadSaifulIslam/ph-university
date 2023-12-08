import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../users/users.models';
import { TStudent } from './students.interface';
import Student from './students.model';

const getAllStudentFromDb = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  const queryObj = { ...query };

  const excludeFields = ['searchTerm', 'limit', 'sort', 'page', 'fields'];
  excludeFields.forEach((query) => delete queryObj[query]);

  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  // {email: $regax: 'df', $options : 'i'}
  const searchFields = ['email', 'name.firstName', 'address'];
  const sserchQuery = Student.find({
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filteringQuery = sserchQuery.find(queryObj);

  // SORTING FUNCTIONALITY:

  let sort = '-createdAt'; // SET DEFAULT VALUE
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filteringQuery.sort(sort);

  // LIMITING FUNCTIONALITY
  let limit = 1;
  if (query?.limit) {
    limit = Number(query.limit);
  }

  let page = 0;
  let skip: number = 0;
  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery
    .limit(limit)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });

  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }
  const fieldsQuery = await limitQuery.select(fields);
  return fieldsQuery;
};

const getSingleStudentFromDb = async (id: string) => {
  const filter = { _id: id };
  const result = await Student.findOne(filter);
  return result;
};
const updateSingleStudentintoDb = async (id: string, payload: TStudent) => {
  const { name, gaurdian, localGuardian, ...remaingStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = { ...remaingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }
  if (gaurdian && Object.keys(gaurdian).length) {
    for (const [key, value] of Object.entries(gaurdian)) {
      modifiedStudent[`gaurdian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFronDb = async (id: string) => {
  const session = await mongoose.startSession();
  console.log(id);
  try {
    await session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
  }
};
export const studentServices = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFronDb,
  updateSingleStudentintoDb,
};
