import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const updateDoc = {
    $set: payload,
  };
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    updateDoc,
  );
  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDB,
};
