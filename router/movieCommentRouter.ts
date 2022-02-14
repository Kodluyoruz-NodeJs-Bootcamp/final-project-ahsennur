import { Router } from 'express';
import { createMovieComment } from '../controller/movieCommentController';
import { auth } from '../middleware/auth';
import passport from '../service/passport';
const router = Router();

//router for movie comments
router.put('/:id', auth, createMovieComment);

export default router;
