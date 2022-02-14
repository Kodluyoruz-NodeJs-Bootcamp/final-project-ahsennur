import { RequestHandler, Request, Response, NextFunction } from 'express';
import User from '../entity/User';

import MovieStar from '../entity/MovieStar';
import MovieStarComment from '../entity/MovieStarComment';
import MovieStarLike from '../entity/MovieStarLike';
import { myMovieStarsData, movieStarsData } from '../helper/pageData';

//create a movieStar with current user
export const createMovieStar: RequestHandler = async (req, res, next) => {
  let movieStars;
  let user;
  try {
    const movieStar = new MovieStar();
    movieStar.name = req.body.name;
    movieStar.surname = req.body.surname;
    movieStar.user = (req.user as User).id as string;
    movieStar.isShared = false;

    //save the movieStar created
    const saved = await MovieStar.save(movieStar);
    res.status(201);
  } catch (e) {
    res.status(400);
  }

  try {
    const data = await myMovieStarsData(req, res, next);
    movieStars = data.movieStars;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovieStars', {
    page_name: 'myMovieStars',
    movieStars,
    user,
  });
};

//to display movieStars
export const getAllMovieStars: RequestHandler = async (req, res, next) => {
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
    res.status(200);
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

//delete movieStar and it's comments and likes
export const deleteMovieStar: RequestHandler = async (req, res, next) => {
  try {
    const movieStar = await MovieStar.delete(req.params.id);
    const movieStarLikes = await MovieStarLike.delete({
      movieStar: req.params.id,
    });

    const movieStarComments = await MovieStarComment.delete({
      movieStar: req.params.id,
    });

    res.status(200);
  } catch (error) {
    res.status(500);
  }

  let movieStars;
  let user;
  try {
    const data = await myMovieStarsData(req, res, next);
    movieStars = data.movieStars;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovieStars', {
    page_name: 'myMovieStars',
    movieStars,
    user,
  });
};

//update an existing movieStar
export const updateMovieStar: RequestHandler = async (req, res, next) => {
  let movieStars;
  let user;

  try {
    const movieStar = await MovieStar.findOne(req.params.id);
    if (movieStar) {
      movieStar.name = req.body.name;
      movieStar.surname = req.body.surname;

      await MovieStar.save(movieStar);

      res.status(200);
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(400);
  }

  try {
    const data = await myMovieStarsData(req, res, next);
    movieStars = data.movieStars;
    user = data.user;
  } catch (e) {
    res.status(500);
  }

  res.render('myMovieStars', {
    page_name: 'myMovieStars',
    movieStars,
    user,
  });
};

//make a movieStar shared to display to other users
export const shareMovieStar: RequestHandler = async (req, res, next) => {
  try {
    const movieStar = await MovieStar.findOne(req.params.id);
    if (movieStar) {
      movieStar.isShared = true;

      await MovieStar.save(movieStar);
    }

    res.status(200);
  } catch (error) {
    res.status(500);
  }

  getAllMovieStars(req, res, next);
};
