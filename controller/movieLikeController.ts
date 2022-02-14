import { RequestHandler } from 'express';
import User from '../entity/User';
import { getRepository } from 'typeorm';
import { getAllMovies } from './movieController';

import MovieLike from '../entity/MovieLike';
import { moviesData } from '../helper/pageData';

//creates a like for a movie
export const createMovieLike: RequestHandler = async (req, res, next) => {
  try {
    const movieLike = new MovieLike();
    movieLike.movie = req.params.id;
    movieLike.user = (req.user as User).id;

    //save the like created
    const saved = await MovieLike.save(movieLike);
    res.status(201);
  } catch (error) {
    res.status(400);
  }
  let movies, movieComments, movieLikes, user, userLiked, commentOwners;
  try {
    const data = await moviesData(req, res, next);
    movies = data.movies;
    movieComments = data.movieComments;
    movieLikes = data.movieLikes;
    user = data.user;
    userLiked = data.userLiked;
    commentOwners = data.commentOwners;
    res.status(201);
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

//delete the like if user unlikes
export const deleteMovieLike: RequestHandler = async (req, res, next) => {
  try {
    const movieLike = await MovieLike.delete({
      movie: req.params.id,
      user: (req.user as User).id,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
  getAllMovies(req, res, next);
};
