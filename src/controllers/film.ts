import { Request, Response } from "express";
import axios from "axios";
import { Film } from "../entities/film";

export const listFilms = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const filmResult = await Film.find();
    console.log(filmResult);
    if (!filmResult.length) {
      const films = await axios.get("https://swapi.dev/api/films");
      if (films) {
        const allFilms = films.data.results;

        const allData = allFilms.map(async (el: any) => {
          const newFilm = Film.create({
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
          const filmData = await Film.save(newFilm);
        });
        const result = await Promise.all(allData);
        return res.status(200).json({ results: allFilms });
      }
    }
    console.log("I ws reached!!!");
    return res.status(200).json({ results: filmResult });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
