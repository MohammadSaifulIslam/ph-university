import bycript from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './users.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: [
        true,
        'User role is required and must be one of: student, faculty, admin',
      ],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      required: [
        true,
        'User status is required and must be one of: in-progress, blocked',
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// monggose pre middleware/hook
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
  next();
});

userSchema.post('save', async (doc, next) => {
  doc.password = '';
  next();
});
export const User = model<TUser>('User', userSchema);
