"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.get("/comments", comment_1.getAllComments);
router.get("/comment/:id", comment_1.getAComment);
router.post("/film/comment/:film_id", comment_1.commentOnFilm);
exports.default = router;
//# sourceMappingURL=comment.js.map