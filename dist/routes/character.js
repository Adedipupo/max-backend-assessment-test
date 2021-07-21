"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const character_1 = require("../controllers/character");
const router = express_1.default.Router();
router.get("/character/:id", character_1.getFilmPeople);
exports.default = router;
//# sourceMappingURL=character.js.map