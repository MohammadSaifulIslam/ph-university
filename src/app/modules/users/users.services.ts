import config from '../../config';
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

  const admissionSeasion = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (admissionSeasion) {
    userData.id = await genarateId(admissionSeasion);
  }
  //   create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.user = newUser._id;
    payload.id = newUser.id;

    // create a student
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
