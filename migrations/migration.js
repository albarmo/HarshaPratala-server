const client = require("../config/connection");

const query = `
CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

client.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Table is successfully created");
  client.end();
});
