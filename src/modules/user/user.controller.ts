import { Response } from 'express';
import { AppController } from '../core/controller/app.controller';
import { ResponseService } from '../core/service/response.service';
import ValidateService from '../core/service/validate.service';
import { UserRepository } from './user.repository';
import { UserCreateValidations, UserLoginValidations } from './user.validation';

class UserController extends AppController {
  constructor() {
    super({ repository: UserRepository });
  }

  public async register(req: any, res: Response) {
    await ValidateService(req, UserCreateValidations)
    await UserRepository.create(req.body)
    const user = await UserRepository.findByCredential(req.body.email, req.body.password)
    const token = await UserRepository.generateAuthToken(user.id)
    return ResponseService.success(res, { user, token }, 'Registrasi Berhasil')
  }

  public async login(req: any, res: Response) {
    await ValidateService(req, UserLoginValidations)
    const user = await UserRepository.findByCredential(req.body.email, req.body.password)
    const token = await UserRepository.generateAuthToken(user.id)
    return ResponseService.success(res, { user, token }, 'Login Berhasil')
  }

  public async me(req:any, res: Response) {
    return ResponseService.success(res, req.user, 'Berhasil mengambil data user');
  }
}

export default UserController