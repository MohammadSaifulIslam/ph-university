import Student from './students.model';

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const filter = { _id: id };
  const result = await Student.findOne(filter);
  return result;
};
export const studentServices = {
  getAllStudentFromDb,
  getSingleStudentFromDb,
};
