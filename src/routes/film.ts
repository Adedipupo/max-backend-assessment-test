import express from 'express';
import { listFilms } from '../controllers/film';

const router = express.Router();

router.get('/',listFilms)


export default router;