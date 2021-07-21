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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAComment = exports.getAllComments = exports.commentOnFilm = void 0;
const comment_1 = require("../entities/comment");
const film_1 = require("../entities/film");
const typeorm_1 = require("typeorm");
const commentOnFilm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { film_id } = req.params;
        const { comments } = req.body;
        const film = yield film_1.Film.findOne(parseInt(film_id));
        if (!film) {
            return res.status(400).json({
                msg: "Film not found",
            });
        }
        const comment = comment_1.Comment.create({
            comments,
            film
        });
        yield comment.save();
        if (comment) {
            film.comment_count += 1;
        }
        yield film.save();
        return res.status(201).json({
            msg: "comment added",
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.commentOnFilm = commentOnFilm;
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield typeorm_1.createQueryBuilder("comment")
            .select("comments.id")
            .addSelect("comments.comments")
            .addSelect("comments.created_at")
            .addSelect("comments.film_id")
            .from(comment_1.Comment, "comments")
            .getMany();
        return res.status(201).json({ comments });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.getAllComments = getAllComments;
const getAComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comments = yield typeorm_1.createQueryBuilder("comment")
            .select("comments.id")
            .addSelect("comments.comments")
            .addSelect("comments.created_at")
            .addSelect("comments.film_id")
            .from(comment_1.Comment, "comments")
            .where("comments.id = :id", { id: parseInt(id) })
            .getOne();
        return res.status(201).json({ comments });
    }
    catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
});
exports.getAComment = getAComment;
//# sourceMappingURL=comment.js.map