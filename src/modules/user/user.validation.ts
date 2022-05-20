import { body } from 'express-validator';
import { UserModel } from './user.model';

const UserCreateValidations = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email diperlukan'),
  body('email')
    .isEmail()
    .withMessage('Email tidak valid'),
  body('fullname')
    .not()
    .isEmpty()
    .withMessage('nama diperlukan'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password diperlukan'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password mminimal 5 karakter'),
  body('photo')
    .not()  
    .isEmpty()
    .withMessage('Photo diperlukan'),
  body('cropped_photo')
    .not()
    .isEmpty()
    .withMessage('Photo tidak valid (1)'),
  body('photo_feature')
    .not()
    .isEmpty()
    .withMessage('Photo tidak valid (2)'),
  body('email').custom(async email => {
    return UserModel.findOne({ email }).exec().then((user: any) => {
      if (user) {
        return Promise.reject('Email sudah digunakan')
      }
    });
  }),
];

const UserLoginValidations = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email diperlukan'),
  body('email')
    .isEmail()
    .withMessage('Email tidak valid'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('password diperlukan'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password mminimal 5 karakter'),
];

export { UserCreateValidations, UserLoginValidations };

