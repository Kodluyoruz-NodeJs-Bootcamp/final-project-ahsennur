import { Router } from 'express';
import { createMovieStarComment } from '../controller/movieStarCommentController';
import { auth } from '../middleware/auth';
const router = Router();

//router for movieStar comments
router.put('/:id', auth, createMovieStarComment);

export default router;
