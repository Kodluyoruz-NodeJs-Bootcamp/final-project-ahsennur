import { RequestHandler } from 'express';
import passport from '../service/passport';

//checks jwt if user has a valid one
export const auth: RequestHandler = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    } //error exception
    if (!user) {
      res.status(401).render('login', {
        page_name: 'login',
      });
    } else {
      req.logIn(user, function () {
        //checked and continue to route
        next();
      });
    }
  })(req, res, next);
};
