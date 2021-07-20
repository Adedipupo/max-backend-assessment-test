import { Request,Response } from "express";
import axios from 'axios';
import { Comment } from "../entities/comment";


export const commentOnFilm = async(req: Request,res: Response): Promise<Response | void> =>{

    try {
       const {comment,filmId} = req.body;

       const filmComment = Comment.create({
           comment,
           film_id: filmId
       })

    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong')
    }
}