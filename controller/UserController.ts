import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../entity/User';

import * as dotenv from 'dotenv';
import { validationResult } from 'express-validator';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY as string;

//save the new user
export const register: RequestHandler = async (req, res, next) => {
  try {
    //create the user to register
    const user = new User();
    user.email = req.body.email;
    user.username = req.body.username;

    //hash the password
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    user.password = bcrypt.hashSync(req.body.password, salt);

    //save the user created
    const saved = await User.save(user);

    res.status(201).render('login', {
      page_name: 'login',
    });
  } catch (e) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).render('register', {
      page_name: 'register',
    });
  }
};
