import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.models';
import { TStudent } from '../students/students.interface';
import Student from '../students/students.model';
import { TUser } from './users.interface';
import { User } from './users.models';
import { genarateId } from './users.utils';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // user
  const userData: Partial<TUser> = {};
  // set password
  userData.password = password || config.default_password;
  userData.role = 'student';
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    if (admissionSemester) {
      userData.id = await genarateId(admissionSemester);
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const userServices = {
  createStudentIntoDb,
};
