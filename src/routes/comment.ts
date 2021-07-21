import express from "express";
import { commentOnFilm, getAComment, getAllComments } from "../controllers/comment";


const router = express.Router();

router.get("/comments", getAllComments)
router.get("/comment/:id", getAComment)
router.post("/film/comment/:film_id", commentOnFilm);


export default router;
