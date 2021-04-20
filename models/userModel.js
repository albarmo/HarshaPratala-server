const client = require("../config/connection");

class Users {
  constructor(id, email, firstname, lastname, age) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  static getAllUser(cb) {
    const qureyGetAllUsers = `
        SELECT * FROM "users"
        `;
    client.query(qureyGetAllUsers, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        const data = res.rows;
        const users = data.map(
          (el) => new Users(el.id, el.email, el.firstname, el.lastname, el.age)
        );
        cb(null, users);
      }
    });
  }

  static RegisterNewUser(values, callback) {
    console.log("model register user");
    const { id, email, firstname, lastname, age } = values;
    const queryRegisterNewUser = `
          INSERT INTO "users"
          ("email", "firstname", "lastname", "age")
          VALUES
          ($1, $2, $3, $4)
          RETURNING *
          `;
    const userValue = [email, firstname, lastname, age];
    client.query(queryRegisterNewUser, userValue, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        let newUser = result.rows[0];
        newUser = new Users(
          newUser.id,
          newUser.email,
          newUser.firstname,
          newUser.lastname,
          newUser.age
        );
        callback(null, newUser);
      }
    });
  }
}

module.exports = Users;
