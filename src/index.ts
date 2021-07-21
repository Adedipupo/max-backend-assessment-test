import express from "express";
import { createConnection } from "typeorm";
import { Comment } from "./entities/comment";
import { Film } from "./entities/film";
import filmRoutes from "./routes/film";
import commentRoutes from "./routes/comment";
import characterRoutes from "./routes/character";

const app = express();

const port = process.env.PORT || 8081;
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5431,
      username: "macuser",
      password: "1234",
      database: "starwarsapi",
      entities: [Comment, Film],
      synchronize: true,
    });
    console.log("Conneted to Postgres");
    app.use(express.json());
    app.use("/film", filmRoutes);
    app.use("/api", commentRoutes);
    app.use("/api",characterRoutes);

    app.listen(port, () => {
      console.log(`Now runing on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to Postgres");
  }
};

main();
