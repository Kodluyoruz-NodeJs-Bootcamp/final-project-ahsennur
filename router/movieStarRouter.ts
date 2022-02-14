import { Router } from 'express';
import { body } from 'express-validator';
import {
  createMovieStar,
  updateMovieStar,
  deleteMovieStar,
  getAllMovieStars,
  shareMovieStar,
} from '../controller/movieStarController';
import { auth } from '../middleware/auth';
import passport from '../service/passport';
const router = Router();

//router for movieStars
router.post('/myMovieStars', auth, createMovieStar);
router.get('/movieStars', auth, getAllMovieStars);
router.patch('/myMovieStars/:id', auth, shareMovieStar);
router.put('/myMovieStars/:id', auth, updateMovieStar);
router.delete('/myMovieStars/:id', auth, deleteMovieStar);

export default router;
