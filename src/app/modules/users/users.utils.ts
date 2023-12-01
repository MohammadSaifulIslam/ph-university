// year semester code genarate id

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.models';

const findLastUserId = async () => {
  const result = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return result?.id ? result.id.substring(6) : undefined;
};
export const genarateId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastUserId()) || (0).toString();
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');

  return (increamentId = `${payload.year}${payload.code}${increamentId}`);
};
