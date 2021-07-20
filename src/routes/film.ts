import express from 'express';
import { getOneFilm, listAllFilms } from '../controllers/film';

const router = express.Router();

router.get('/',listAllFilms)
router.get('/:id',getOneFilm)

export default router;