"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilmQueried = exports.getAFilmQueried = exports.getOneFilm = exports.listAllFilms = void 0;
const axios_1 = __importDefault(require("axios"));
const film_1 = require("../entities/film");
const typeorm_1 = require("typeorm");
const listAllFilms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filmResult = yield film_1.Film.find();
        if (!filmResult.length) {
            const films = yield axios_1.default.get("https://swapi.dev/api/films");
            if (films) {
                const allFilms = films.data.results;
                const allData = allFilms.map((el) => __awaiter(void 0, void 0, void 0, function* () {
                    const newFilm = film_1.Film.create({
                        title: el.title,
                        episode_id: el.episode_id,
                        opening_crawl: el.opening_crawl,
                        director: el.director,
                        producer: el.producer,
                        release_date: el.release_date,
                        characters: el.characters,
                        planets: el.planets,
                        starships: el.starships,
                        vehicles: el.vehicles,
                        species: el.species,
                        created: el.created,
                        edited: el.edited,
                        url: el.url,
                    });
                    const filmData = yield film_1.Film.save(newFilm);
                }));
                const result = yield Promise.all(allData);
                return res.status(200).json({ results: allFilms });
            }
        }
        return res.status(200).json({ results: filmResult });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.listAllFilms = listAllFilms;
const getOneFilm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const film = yield film_1.Film.findOne(id);
        if (film) {
            return res.status(200).json({ result: film });
        }
        else {
            return res.status(401).json({ msg: "Not found" });
        }
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.getOneFilm = getOneFilm;
const getAFilmQueried = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const film = yield typeorm_1.createQueryBuilder("film")
            .select("film.id")
            .addSelect("film.title")
            .addSelect("film.opening_crawl")
            .addSelect("film.release_date")
            .addSelect("film.comment_count")
            .from(film_1.Film, "film")
            .where("film.id = :id", { id: parseInt(id) })
            .getOne();
        return res.status(201).json({ film });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.getAFilmQueried = getAFilmQueried;
const getAllFilmQueried = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const film = yield typeorm_1.createQueryBuilder("film")
            .select("film.title")
            .addSelect("film.opening_crawl")
            .addSelect("film.release_date")
            .addSelect("film.comment_count")
            .from(film_1.Film, "film")
            .getMany();
        return res.status(201).json({ film });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.getAllFilmQueried = getAllFilmQueried;
//# sourceMappingURL=film.js.map