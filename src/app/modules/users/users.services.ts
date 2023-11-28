import config from '../../config';
import { TStudent } from '../students/students.interface';
import Student from '../students/students.model';
import { TUser } from './users.interface';
import { User } from './users.models';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // user
  const userData: Partial<TUser> = {};
  // set password
  userData.password = password || config.default_password;
  userData.role = 'student';
  userData.id = '2023110001';

  //   create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.user = newUser._id;
    studentData.id = newUser.id;

    // create a student
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
