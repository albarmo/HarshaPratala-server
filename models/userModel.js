const client = require("../config/connection");
class Users {
  constructor(id, email, firstname, lastname, age) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  static getAllUser(callback) {
    const qureyGetAllUsers = `
        SELECT * FROM "users"
        `;
    client.query(qureyGetAllUsers, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        const data = res.rows;
        const users = data.map(
          (el) => new Users(el.id, el.email, el.firstname, el.lastname, el.age)
        );
        callback(null, users);
      }
    });
  }

  static RegisterNewUser(values, callback) {
    const { email, firstname, lastname, age } = values;
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

  static updateUser(id, email, firstname, lastname, age, callback) {
    const updateQuery = `
    UPDATE "users"
    SET
    "email" = $1,
    "firstname" = $2,
    "lastname" = $3,
    "age" = $4
    WHERE 
    id = $5;
    `;
    let params = [email, firstname, lastname, age, id];
    client.query(updateQuery, params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

  static deleteUser(id, callback) {
    console.log("delete user model");
    let queryDelete = `DELETE FROM "users" WHERE id = $1;`;
    let params = [id];

    client.query(queryDelete, params, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }
}

module.exports = Users;
