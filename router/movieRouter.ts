import { Router } from 'express';
import { body } from 'express-validator';
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  shareMovie,
} from '../controller/movieController';
import { auth } from '../middleware/auth';
import passport from '../service/passport';
const router = Router();

//router for movies
router.post('/myMovies', auth, createMovie);
router.get('/movies', auth, getAllMovies);
router.patch('/myMovies/:id', auth, shareMovie);
router.put('/myMovies/:id', auth, updateMovie);
router.delete('/myMovies/:id', auth, deleteMovie);

export default router;
