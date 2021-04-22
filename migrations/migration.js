const client = require("../config/connection");

const query = `
DROP TABLE IF EXISTS Users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

// let queryUsers = `
// DROP TABLE IF EXISTS "Users";
// CREATE TABLE IF NOT EXISTS "Users" (
//     "id" SERIAL PRIMARY KEY NOT NULL,
//     "email" SERIAL NOT NULL,
//     "firstName" VARCHAR(25) NOT NULL,
//     "lastName" VARCHAR(25) NOT NULL,
//     "age" VARCHAR(25) NOT NULL
// );
// `;

client.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Table Users is successfully created");
  client.end();
});
