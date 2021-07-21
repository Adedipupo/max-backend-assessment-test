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
      type: "postgres",
      host: "ec2-52-1-20-236.compute-1.amazonaws.com",
      port: 5432,
      username: "nqdtoxhrwdvunh",
      password: "82613f70df3c8fb48e4d857ce486691d821b26403f6ba21488313cb381fb0d9d",
      database: "de8mtikhmjrrlh",
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
