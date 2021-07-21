import express from "express";
import { commentOnFilm, getAllComments } from "../controllers/comment";


const router = express.Router();

router.get("/comments", getAllComments)
router.post("/film/comment/:film_id", commentOnFilm);


export default router;
