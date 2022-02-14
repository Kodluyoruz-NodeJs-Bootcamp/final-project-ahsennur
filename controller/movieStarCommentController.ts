import { RequestHandler } from 'express';
import User from '../entity/User';
import MovieStarComment from '../entity/MovieStarComment';
import { movieStarsData } from '../helper/pageData';

//create a movieStar comment for the movieStar
export const createMovieStarComment: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const movieStarComment = new MovieStarComment();
    movieStarComment.comment = req.body.name;
    movieStarComment.movieStar = req.params.id;
    movieStarComment.user = (req.user as User).id;

    //save the movieStar created
    const saved = await MovieStarComment.save(movieStarComment);

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
