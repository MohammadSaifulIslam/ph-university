import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../users/users.models';
import Student from './students.model';

const getAllStudentFromDb = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const filter = { _id: id };
  const result = await Student.findOne(filter);
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
};
