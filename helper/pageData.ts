import { RequestHandler, Request, Response, NextFunction } from 'express';
import User from '../entity/User';
import { getRepository } from 'typeorm';

import Movie from '../entity/Movie';
import MovieComment from '../entity/MovieComment';
import MovieLike from '../entity/MovieLike';
import MovieStar from '../entity/MovieStar';
import MovieStarComment from '../entity/MovieStarComment';
import MovieStarLike from '../entity/MovieStarLike';

//to get the data to load movies page
export const moviesData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let movies,
    movieComments = [],
    movieLikes = [],
    user,
    userLiked = [],
    commentOwners = [];

  movies = await Movie.find();

  user = await User.findOne((req.user as User).id);

  for (let i = 0; i < movies.length; i++) {
    const tempComments = await MovieComment.find({
      where: { movie: movies[i].id },
    });
    let tempCommentOwner = [];
    for (let j = 0; j < tempComments.length; j++) {
      tempCommentOwner[j] = await User.createQueryBuilder('*')
        .where('id = :userid', { userid: tempComments[j].user })
        .getOne();
    }
    const tempLikes = await MovieLike.find({ where: { movie: movies[i].id } });
    const tempLiked = await MovieLike.find({
      where: { movie: movies[i].id, user: (req.user as User).id },
    });
    if (tempLiked.length > 0) {
      userLiked[i] = true;
    } else userLiked[i] = false;

    movieComments[i] = tempComments;
    movieLikes[i] = tempLikes;
    commentOwners[i] = tempCommentOwner;
  }
  return { movies, movieComments, movieLikes, user, userLiked, commentOwners };
};

//to get the data to load movie stars page
export const movieStarsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let movieStars,
    movieStarComments = [],
    movieStarLikes = [],
    user,
    userLiked = [],
    commentOwners = [];

  movieStars = await MovieStar.find();

  user = await User.findOne((req.user as User).id);

  const movieStarLikeRepo = getRepository(MovieLike);
  for (let i = 0; i < movieStars.length; i++) {
    const tempComments = await MovieStarComment.find({
      where: { movieStar: movieStars[i].id },
    });
    let tempCommentOwner = [];
    for (let j = 0; j < tempComments.length; j++) {
      tempCommentOwner[j] = await User.createQueryBuilder('*')
        .where('id = :userid', { userid: tempComments[j].user })
        .getOne();
    }
    const tempLikes = await MovieStarLike.find({
      where: { movieStar: movieStars[i].id },
    });
    const tempLiked = await MovieStarLike.find({
      where: { movieStar: movieStars[i].id, user: (req.user as User).id },
    });
    if (tempLiked.length > 0) {
      userLiked[i] = true;
    } else userLiked[i] = false;

    movieStarComments[i] = tempComments;
    movieStarLikes[i] = tempLikes;
    commentOwners[i] = tempCommentOwner;
  }
  return {
    movieStars,
    movieStarComments,
    movieStarLikes,
    user,
    userLiked,
    commentOwners,
  };
};

//to get to data to load myMovies page
export const myMoviesData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let movies;
  let user;
  user = req.user as User;
  movies = await Movie.find({ where: { user: user.id } });

  return { movies, user };
};

//to get to data to load myMovies page
export const myMovieStarsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let movieStars;
  let user;
  user = req.user as User;
  movieStars = await MovieStar.find({ where: { user: user.id } });

  return { movieStars, user };
};
