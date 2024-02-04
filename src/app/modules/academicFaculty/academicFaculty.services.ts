import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDb = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const updateDoc = {
    $set: payload,
  };
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, updateDoc);
  return result;
};
export const academicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDB,
};
