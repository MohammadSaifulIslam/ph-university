// year semester code genarate id

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.models';

const findLastUserId = async () => {
  const result = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return result?.id ? result.id : undefined;
};
export const genarateId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  // id = 2030 01 0001
  const lastStudentId = await findLastUserId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;
  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');

  return (increamentId = `${payload.year}${payload.code}${increamentId}`);
};
