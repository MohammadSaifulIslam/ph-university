// year semester code genarate id

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.models';

const findLastUserId = async () => {
  const result = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return result?.id ? result.id : undefined;
};
export const generateStudentId = async (payload: TAcademicSemester) => {
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

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
