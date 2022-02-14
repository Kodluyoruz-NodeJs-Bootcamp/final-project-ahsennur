import { RequestHandler } from 'express';
import User from '../entity/User';
import { getRepository } from 'typeorm';
import { getAllMovieStars } from './movieStarController';

import MovieStarLike from '../entity/MovieStarLike';
import { movieStarsData } from '../helper/pageData';

//creates a like for a movieStar
export const createMovieStarLike: RequestHandler = async (req, res, next) => {
  try {
    const movieStarLike = new MovieStarLike();
    movieStarLike.movieStar = req.params.id;
    movieStarLike.user = (req.user as User).id;

    //save the like created
    const saved = await MovieStarLike.save(movieStarLike);
    res.status(201);
  } catch (error) {
    res.status(400);
  }
  let movieStars,
    movieStarComments,
    movieStarLikes,
    user,
    userLiked,
    commentOwners;
  try {
    const data = await movieStarsData(req, res, next);
    movieStars = data.movieStars;
    movieStarComments = data.movieStarComments;
    movieStarLikes = data.movieStarLikes;
    user = data.user;
    userLiked = data.userLiked;
    commentOwners = data.commentOwners;
  } catch (error) {
    res.status(500);
  }

  res.render('movieStars', {
    page_name: 'movieStars',
    movieStars,
    movieStarComments,
    movieStarLikes,
    user,
    userLiked,
    commentOwners,
  });
};

//delete the like if user unlikes
export const deleteMovieStarLike: RequestHandler = async (req, res, next) => {
  try {
    const movieStarLike = await MovieStarLike.delete({
      movieStar: req.params.id,
      user: (req.user as User).id,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
  }
  getAllMovieStars(req, res, next);
};
