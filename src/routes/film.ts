import express from "express";
import {
  getAllFilmQueried,
  getOneFilm,
  listAllFilms,
  getAFilmQueried
} from "../controllers/film";

const router = express.Router();

router.get("/", listAllFilms);
router.get("/one/:id", getOneFilm);
router.get("/two/q", getAllFilmQueried);
router.get("/three/:id", getAFilmQueried);

export default router;
