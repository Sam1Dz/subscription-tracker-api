export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
}
