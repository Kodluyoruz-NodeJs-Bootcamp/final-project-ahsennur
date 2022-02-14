import { Router } from 'express';
import { getLoginPage, getRegisterPage } from '../controller/pageController';
const router = Router();

//router for pages
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);

export default router;
