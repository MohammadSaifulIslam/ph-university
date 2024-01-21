/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.models';
import { semesterRegistrationStatus } from './semesterRegistation.constant';
import { TSemesterRegistration } from './semesterRegistation.interface';
import { SemesterRegistration } from './semesterRegistation.model';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: payload?.academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exist!');
  }

  // check is there any upcoming or ongoing semester or not
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }

  const academicSemester = payload?.academicSemester;
  const isSemesterRegistrationIsAlreadyExist =
    await SemesterRegistration.findOne({ academicSemester });

  // check if semester registration is already done
  if (isSemesterRegistrationIsAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered',
    );
  }

  //   check if the academicSemester is correct or not
  const isAcademicSemesterIsExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterIsExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Id is not a valid academic semester ID',
    );
  }
  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const facultyQuery = new QueryBuilder(SemesterRegistration.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updateSemesterRegistrationIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!');
  }

  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedStatus = payload.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This semester registration is ended!`,
    );
  }

  // UPCOMING -> ONGOING -> ENDED

  if (
    currentSemesterStatus === semesterRegistrationStatus.UPCOMING &&
    requestedStatus === semesterRegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === semesterRegistrationStatus.ONGOING &&
    requestedStatus === semesterRegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDb,
};
