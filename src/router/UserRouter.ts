import { Router } from 'express';
import { body } from 'express-validator';
import User from '../entity/User';
import { register } from '../controller/UserController';

const router = Router();

//router for users
router.post(
  '/register',

  body('username').not().isEmpty().withMessage('Enter a username'),

  body('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .custom(async (email) => {
      return User.findOne({ email }).then((user) => {
        if (user && email) {
          return Promise.reject('This email is already in use');
        }
        return Promise.resolve();
      });
    }),

  body('password').not().isEmpty().withMessage('Enter A Password'),
  register
);

export default router;
