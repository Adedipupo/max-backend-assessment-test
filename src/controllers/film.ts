import { Request,Response } from "express";


export const listFilms = async(req: Request,res: Response): Promise<Response | void> =>{
    const name = req.body

    return res.json({name})
}