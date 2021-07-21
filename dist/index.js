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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const comment_1 = require("./entities/comment");
const film_1 = require("./entities/film");
const film_2 = __importDefault(require("./routes/film"));
const comment_2 = __importDefault(require("./routes/comment"));
const character_1 = __importDefault(require("./routes/character"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 8081;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: "postgres",
            host: process.env.Host,
            port: process.env.Port,
            username: process.env.User,
            password: process.env.Password,
            database: process.env.Database,
            entities: [comment_1.Comment, film_1.Film],
            synchronize: true
        });
        console.log("Conneted to Postgres");
        app.use(express_1.default.json());
        app.use("/film", film_2.default);
        app.use("/api", comment_2.default);
        app.use("/api", character_1.default);
        app.listen(port, () => {
            console.log(`Now runing on port ${port}`);
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Unable to connect to Postgres");
    }
});
main();
//# sourceMappingURL=index.js.map