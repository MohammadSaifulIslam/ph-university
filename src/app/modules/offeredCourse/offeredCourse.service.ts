import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

import { SemesterRegistration } from '../semesterRegistation/semesterRegistation.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

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

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCouresServices = {
  createOfferedCourseIntoDb,
};
