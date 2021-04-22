const { json } = require("express");
const Users = require("../models/userModel");

class UserController {
  static getAllUser(req, res) {
    Users.getAllUser((error, data) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else {
        res.status(200).json(data);
      }
    });
  }

  static addNewUser(req, res) {
    console.log("register user", req);
    //const { email, lastname, age } = req.body;
    try {
      let userValues = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
      };

      Users.RegisterNewUser(userValues, (error, userResult) => {
        console.log(`userValues`, userValues);
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          res
            .status(201)
            .json({ message: `success create user ${userResult.email}` });
        }
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static editUserData(req, res) {
    let id = req.params.id;
    const { email, firstname, lastname, age } = req.body;

    // let userValues = {
    //   email: req.body.email,
    //   firstname: req.body.firstname,
    //   lastname: req.body.lastname,
    //   age: req.body.age,
    // };

    Users.updateUser(id, email, firstname, lastname, age, (err, userResult) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({
          message: `success update user ${email}`,
        });
      }
    });
  }

  static deleteUser(req, res) {
    let id = req.params.id;
    Users.deleteUser(id, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({ message: `success deleted user with ${id}` });
      }
    });
  }
}

module.exports = UserController;
