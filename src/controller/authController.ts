import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { myMoviesData, myMovieStarsData } from '../helper/pageData';

const SECRET_KEY = process.env.SECRET_OR_KEY as string;

//callback for google login
export const googleCallback: RequestHandler = async (req, res, next) => {
  //sign and assign a jwt token
  const token = jwt.sign({ user: req.user }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('jwt', token);
  let movies;
  let user;
  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
    res.status(201);
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//callback for facebook login
export const facebookCallback: RequestHandler = async (req, res, next) => {
  //sign and assign a jwt token
  const token = jwt.sign({ user: req.user }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('jwt', token);
  let movies;
  let user;
  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
    res.status(201);
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//user logout
export const logout: RequestHandler = async (req, res, next) => {
  //clear jwt token from cookie
  res.clearCookie('jwt');
  res.status(200).render('login', {
    page_name: 'login',
  });
};

//get myMovies page
export const getMyMovies: RequestHandler = async (req, res, next) => {
  let movies;
  let user;
  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
    res.status(200);
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//get myMovies page
export const getMyMovieStars: RequestHandler = async (req, res, next) => {
  let movieStars;
  let user;
  try {
    const data = await myMovieStarsData(req, res, next);
    movieStars = data.movieStars;
    user = data.user;
    res.status(200);
  } catch (e) {
    res.status(500);
  }

  res.render('myMovieStars', {
    page_name: 'myMovieStars',
    movieStars,
    user,
  });
};
//login with email
export const login: RequestHandler = async (req, res, next) => {
  //sign and assign jwt token
  const token = jwt.sign({ user: req.user }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('jwt', token);

  getMyMovies(req, res, next);
};
