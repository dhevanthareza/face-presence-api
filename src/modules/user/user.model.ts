import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';

interface IUser {
  fullname: string;
  email: string;
  password: string;
  photo: object;
  cropped_photo: object;
  photo_feature: any[];
}
const userSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String, required: true, set: (password: string) => {
      return bcrypt.hashSync(password, 10)
    },
  },
  photo: { type: Object, required: true },
  cropped_photo: { type: Object, required: true },
  photo_feature: { type: Array(), required: true },
}, { timestamps: true });

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };

