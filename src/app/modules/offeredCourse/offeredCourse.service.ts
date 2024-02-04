import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegistration } from '../semesterRegistation/semesterRegistation.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    startTime,
    endTime,
    days,
  } = payload;

  // check if the start time is before the end time

  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  if (!(start < end)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Start time should be before end time.',
    );
  }

  const isSemesesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration not found.',
    );
  }
  const academicSemester = isSemesesterRegistrationExist?.academicSemester;

  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found.');
  }

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found.');
  }
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found.');
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found.');
  }

  // check if the department is belong to faculty

  const isFacultyBelongToDepartment = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isFacultyBelongToDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExist.name} is not belong to ${isAcademicFacultyExist.name} faculty!`,
    );
  }

  // check if the offered course with same semester registeration is exist with same section

  const isOfferedCourseWithSameSemesterRegisterationWithSameSectionExist =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isOfferedCourseWithSameSemesterRegisterationWithSameSectionExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This offered course with same semester registeration with same section is already exist!`,
    );
  }

  //check time conflict with the faculty

  const existingSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(existingSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is time conflict for Faculty ! Please choose another time or day `,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleOfferedCourseFromDb = async (id: string) => {
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found.');
  }

  return isOfferedCourseExist;
};

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'days' | 'faculty' | 'startTime' | 'endTime' | 'maxCapacity'
  >,
) => {
  const { faculty, startTime, endTime, days } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found.');
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found.');
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not update offered course which semester status as at ${semesterRegistrationStatus?.status}`,
    );
  }

  //check time conflict with the faculty

  const existingSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(existingSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is time conflict for Faculty ! Please choose another time or day `,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistation).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not delete ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const offeredCouresServices = {
  createOfferedCourseIntoDb,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
};
