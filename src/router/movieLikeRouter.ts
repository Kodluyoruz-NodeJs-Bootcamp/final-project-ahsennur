import { Router } from 'express';
import {
  createMovieLike,
  deleteMovieLike,
} from '../controller/movieLikeController';
import { auth } from '../middleware/auth';
const router = Router();

//router for movie likes
router.post('/:id', auth, createMovieLike);
router.delete('/:id', auth, deleteMovieLike);

export default router;
