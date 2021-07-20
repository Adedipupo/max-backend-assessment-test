import { Request, Response } from "express";
import axios from "axios";
import { Film } from "../entities/film";
import { createQueryBuilder } from "typeorm";

export const listAllFilms = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const filmResult = await Film.find();
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
    return res.status(200).json({ results: filmResult });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getOneFilm = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const {id} = req.params;

        const film = await Film.findOne(id)
    
        if(film){
            return res.status(200).json({ result: film})
        }else{
            return res.status(401).json({msg:"Not found"})
        }
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong')
    }
}

export const getAllFilmQueried = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const film = await createQueryBuilder(
            'film'
        )
        .select('film.opening_crawl')
        .addSelect('film.release_date')
        .from(Film,'film')
        .getMany()

        return res.status(201).json({film})
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong')
    }
}