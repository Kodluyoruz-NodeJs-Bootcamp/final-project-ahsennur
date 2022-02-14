import { Router } from 'express';
import passport from '../service/passport';
const router = Router();
import { auth } from '../middleware/auth';
import {
  googleCallback,
  facebookCallback,
  getMyMovies,
  login,
  logout,
  getMyMovieStars,
} from '../controller/authController';

//routers for auth related routes

router.get('/', auth, getMyMovies);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookCallback
);

router.get('/logout', logout);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  login
);

router.get('/myMovies', auth, getMyMovies);

router.get('/myMovieStars', auth, getMyMovieStars);

export default router;
