import config from '../app/config';
import { USER_ROLE } from '../app/modules/users/users.constant';
import { User } from '../app/modules/users/users.models';

const superAdmin = {
  id: '00001',
  email: 'saifmdislam231@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};
export default seedSuperAdmin;
