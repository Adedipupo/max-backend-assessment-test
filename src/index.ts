import express from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Comment } from "./entities/comment";
import { Film } from "./entities/film";
import filmRoutes from "./routes/film";
import commentRoutes from "./routes/comment";
import characterRoutes from "./routes/character";

dotenv.config();

const app = express();

const port = process.env.PORT || 8081;
const main = async () => {
  try {
    await createConnection({
      type: process.env.TYPEORM_CONNECTION as "postgres",
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT as unknown as number,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Comment, Film],
      synchronize: true,
    });
    console.log("Conneted to Postgres");
    app.use(express.json());
    app.use("/film", filmRoutes);
    app.use("/api", commentRoutes);
    app.use("/api", characterRoutes);

    app.listen(port, () => {
      console.log(`Now runing on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to Postgres");
  }
};

main();
