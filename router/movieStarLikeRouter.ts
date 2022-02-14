import { Router } from 'express';
import {
  createMovieStarLike,
  deleteMovieStarLike,
} from '../controller/movieStarLikeController';
import { auth } from '../middleware/auth';
const router = Router();

//router for movieStar likes
router.post('/:id', auth, createMovieStarLike);
router.delete('/:id', auth, deleteMovieStarLike);

export default router;
