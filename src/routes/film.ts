import express from "express";
import {
  getAllFilmQueried,
  getOneFilm,
  listAllFilms,
} from "../controllers/film";

const router = express.Router();

router.get("/", listAllFilms);
router.get("/one/:id", getOneFilm);
router.get("/two/q", getAllFilmQueried);

export default router;
