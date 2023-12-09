import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.services';

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin is retrived succesfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admins are retrived succesfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
