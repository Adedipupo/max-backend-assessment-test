"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const film_1 = require("../controllers/film");
const router = express_1.default.Router();
router.get("/", film_1.listAllFilms);
router.get("/one/:id", film_1.getOneFilm);
router.get("/two/q", film_1.getAllFilmQueried);
router.get("/three/:id", film_1.getAFilmQueried);
exports.default = router;
//# sourceMappingURL=film.js.map