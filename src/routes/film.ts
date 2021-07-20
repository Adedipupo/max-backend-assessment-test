import express from 'express';
import { listFilms } from '../controllers/film';

const router = express.Router();

router.post('/',listFilms)


export default router;