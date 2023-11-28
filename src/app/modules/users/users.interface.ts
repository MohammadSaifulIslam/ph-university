export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'facultry' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
