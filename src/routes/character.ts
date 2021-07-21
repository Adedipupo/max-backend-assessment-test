import express from "express";
import { getFilmPeople } from "../controllers/character";


const router = express.Router();

router.get("/character/:id", getFilmPeople);

export default router;
