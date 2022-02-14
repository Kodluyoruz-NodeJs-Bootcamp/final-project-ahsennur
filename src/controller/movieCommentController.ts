import { RequestHandler } from 'express';
import User from '../entity/User';
import MovieComment from '../entity/MovieComment';
import { moviesData } from '../helper/pageData';

//create a movie comment for the movie
export const createMovieComment: RequestHandler = async (req, res, next) => {
  try {
    const movieComment = new MovieComment();
    movieComment.comment = req.body.name;
    movieComment.movie = req.params.id;
    movieComment.user = (req.user as User).id;

    //save the movie created
    const saved = await MovieComment.save(movieComment);

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
