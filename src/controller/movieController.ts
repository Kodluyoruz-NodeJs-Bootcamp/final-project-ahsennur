import { RequestHandler, Request, Response, NextFunction } from 'express';
import User from '../entity/User';

import Movie from '../entity/Movie';
import MovieComment from '../entity/MovieComment';
import MovieLike from '../entity/MovieLike';
import { myMoviesData, moviesData } from '../helper/pageData';

//create a movie with current user
export const createMovie: RequestHandler = async (req, res, next) => {
  let movies;
  let user;
  try {
    const movie = new Movie();
    movie.name = req.body.name;
    movie.plot = req.body.plot;
    movie.user = (req.user as User).id as string;
    movie.isShared = false;

    //save the movie created
    const saved = await Movie.save(movie);
    res.status(201);
  } catch (e) {
    res.status(400);
  }

  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//to display movies
export const getAllMovies: RequestHandler = async (req, res, next) => {
  let movies, movieComments, movieLikes, user, userLiked, commentOwners;
  try {
    const data = await moviesData(req, res, next);
    movies = data.movies;
    movieComments = data.movieComments;
    movieLikes = data.movieLikes;
    user = data.user;
    userLiked = data.userLiked;
    commentOwners = data.commentOwners;
    res.status(200);
  } catch (error) {
    res.status(500);
  }

  res.render('movies', {
    page_name: 'movies',
    movies,
    movieComments,
    movieLikes,
    user,
    userLiked,
    commentOwners,
  });
};

//delete movie and it's comments and likes
export const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    const movie = await Movie.delete(req.params.id);
    const movieLikes = await MovieLike.delete({ movie: req.params.id });

    const movieComments = await MovieComment.delete({ movie: req.params.id });

    res.status(200);
  } catch (error) {
    res.status(500);
  }

  let movies;
  let user;
  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//update an existing movie
export const updateMovie: RequestHandler = async (req, res, next) => {
  let movies;
  let user;

  try {
    const movie = await Movie.findOne(req.params.id);
    if (movie) {
      movie.name = req.body.name;
      movie.plot = req.body.plot;

      await Movie.save(movie);

      res.status(200);
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(400);
  }

  try {
    const data = await myMoviesData(req, res, next);
    movies = data.movies;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovies', {
    page_name: 'myMovies',
    movies,
    user,
  });
};

//make a movie shared to display to other users
export const shareMovie: RequestHandler = async (req, res, next) => {
  try {
    const movie = await Movie.findOne(req.params.id);
    if (movie) {
      movie.isShared = true;

      await Movie.save(movie);
    }

    res.status(200);
  } catch (error) {
    res.status(500);
  }

  getAllMovies(req, res, next);
};
