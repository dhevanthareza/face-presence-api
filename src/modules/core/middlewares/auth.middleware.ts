import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../user/user.model';
import ApplicationError from '../helpers/errorHandler';
import * as config from './../../../config.json';
import { AppRequest } from './../../../typings/request.d';

const isAuthenticated = async (req: AppRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.slice(7, token.length);
    jwt.verify(token, (config as any)[process.env.NODE_ENV].jwt_secret, async (error: any, decoded: any) => {
      if (error || decoded === null) {
        throw new ApplicationError({ message: 'Token Not Valid', 'code': 401 })
      } else {
        const user = await UserModel.findById(decoded.id)
        req.user = user;
        next();
      }
    })
  } else {
    throw new ApplicationError({ message: 'No Token', code: 401 })
  }
}
export default isAuthenticated