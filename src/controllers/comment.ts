import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/comment";
import { Film } from "../entities/film";
import requestIp from "request-ip";
import { createQueryBuilder } from "typeorm";

// var ipMiddleware = function(req:Request, res:Response, next:NextFunction) {
//     var clientIp = requestIp.getClientIp(req);
//     next();
// };
export const commentOnFilm = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { film_id } = req.params;
    const { comments } = req.body;

    const film = await Film.findOne(parseInt(film_id));

    if (!film) {
      return res.status(400).json({
        msg: "Film not found",
      });
    }
    const comment = Comment.create({
      comments,
      film
    });
    await comment.save();

    if(comment){
      film.comment_count += 1 
    }

    await film.save();

    return res.status(201).json({
      msg: "comment added",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const getAllComments = async (req: Request, res: Response): Promise<Response|void>=>{
  try {
    const comments = await createQueryBuilder("comment")
      .select("comments.id")
      .addSelect("comments.comments")
      .addSelect("comments.created_at")
      .addSelect("comments.film_id")
      .from(Comment, "comments")
      .getMany();

    return res.status(201).json({ comments });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}