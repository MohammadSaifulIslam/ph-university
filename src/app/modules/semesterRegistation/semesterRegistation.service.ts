/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.models';
import { semesterRegistationStatus } from './semesterRegistation.constant';
import { TSemesterRegistation } from './semesterRegistation.interface';
import { SemesterRegistation } from './semesterRegistation.model';

const createSemesterRegistationIntoDb = async (
  payload: TSemesterRegistation,
) => {
  const isSemesterRegistationExist = await SemesterRegistation.findOne({
    academicSemester: payload?.academicSemester,
  });

  if (isSemesterRegistationExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exist!');
  }

  // check is there any upcoming or ongoing semester or not
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistation.findOne(
    { $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }] },
  );

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }

  const academicSemester = payload?.academicSemester;
  const isSemesterRegistationIsAlreadyExist = await SemesterRegistation.findOne(
    { academicSemester },
  );

  // check if semester registation is already done
  if (isSemesterRegistationIsAlreadyExist) {
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
  const result = await SemesterRegistation.create(payload);

  return result;
};

const getAllSemesterRegistationFromDB = async (
  query: Record<string, unknown>,
) => {
  const facultyQuery = new QueryBuilder(SemesterRegistation.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistationFromDB = async (id: string) => {
  const result = await SemesterRegistation.findById(id);

  return result;
};

const updateSemesterRegistationIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistation>,
) => {
  const isSemesterRegistationExist = await SemesterRegistation.findById(id);

  if (!isSemesterRegistationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!');
  }

  const currentSemesterStatus = isSemesterRegistationExist?.status;
  const requestedStatus = payload.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This semester registation is ended!`,
    );
  }

  // UPCOMING -> ONGOING -> ENDED

  if (
    currentSemesterStatus === semesterRegistationStatus.UPCOMING &&
    requestedStatus === semesterRegistationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === semesterRegistationStatus.ONGOING &&
    requestedStatus === semesterRegistationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistation.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semesterRegistationServices = {
  createSemesterRegistationIntoDb,
  getAllSemesterRegistationFromDB,
  getSingleSemesterRegistationFromDB,
  updateSemesterRegistationIntoDb,
};
