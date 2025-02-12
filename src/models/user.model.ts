import Mongoose from 'mongoose';

/* TYPES */
import type { IUser } from '../types/user';

const UserSchema = new Mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid Email address'],
    },
    password: {
      type: String,
      required: [true, 'User Password is required'],
      minLength: 6,
    },
  },
  { timestamps: true },
);

const UserModel = Mongoose.model('UserModel', UserSchema);

export default UserModel;
