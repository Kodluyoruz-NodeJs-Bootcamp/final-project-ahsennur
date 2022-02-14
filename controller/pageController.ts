import { RequestHandler } from 'express';

//to get resigter page
export const getRegisterPage: RequestHandler = async (req, res, next) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

//to get login page
export const getLoginPage: RequestHandler = async (req, res, next) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
