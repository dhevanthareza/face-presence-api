import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import ApplicationError from '../core/helpers/errorHandler';
import { AppRepository, IRepositoryOptions } from '../core/repository/app.repository';
import { ErrorType } from '../core/typing/error.type';
import * as config from './../../config.json';
import { IUser, UserModel } from './user.model';

class UserRepository extends AppRepository {
  public static options: IRepositoryOptions = {
    model: UserModel,
    canSearchField: [],
  };

  public static async findByCredential(email: string, password: string): Promise<Document<any, any, IUser> & IUser> {
    const user = await UserModel.findOne({ email }).select('-photo_feature')
    if (!user) {
      throw new ApplicationError({ message: 'User tidak ditemukan', code: ErrorType.NO_USER });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new ApplicationError({ message: 'Password Salah', code: ErrorType.WRONG_PASSWORD });
    }
    return user
  }

  public static async generateAuthToken(userId: string) {
    const user = await UserModel.findById(userId);
    const token = await jwt.sign({
      id: user.id,
      fullname: user.fullname,
      email: user.email
    }, (config as any)[process.env.NODE_ENV].jwt_secret);
    return token;
  }
}

export { UserRepository };

