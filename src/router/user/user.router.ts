import { Router } from 'express';
import { asyncHandler } from '../../modules/core/helpers/asyncHandler';
import isAuthenticated from '../../modules/core/middlewares/auth.middleware';
import { fileMiddleware } from '../../modules/core/middlewares/file.middleware';
import UserController from '../../modules/user/user.controller';

const UserRouter = Router()
const UserControllerObj = new UserController()

UserRouter.get('/', UserControllerObj.getAll)
UserRouter.get('/me', isAuthenticated, asyncHandler(UserControllerObj.me))
UserRouter.get('/datatable', UserController.datatable)
UserRouter.get('/:id', UserControllerObj.get)
UserRouter.post('/', fileMiddleware({ fields: [{ name: 'photo', maxCount: 1 }, { name: 'cropped_photo', maxCount: 1 }] }), UserControllerObj.create)
UserRouter.post(
  '/register',
  fileMiddleware({ fields: [{ name: 'photo', maxCount: 1 }, { name: 'cropped_photo', maxCount: 1 }] }),
  asyncHandler(UserControllerObj.register)
)
UserRouter.post(
  '/login',
  asyncHandler(UserControllerObj.login)
)
UserRouter.put('/:id', UserControllerObj.update)
UserRouter.delete('/:id', UserControllerObj.delete)

export { UserRouter };

