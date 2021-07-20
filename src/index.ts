import { createConnection } from "typeorm";

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5431,
      username: "macuser",
      password: "1234",
      database: "starwarsapi",
    });
    console.log("Conneted to Postgres");
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to Postgres");
  }
};

main();
