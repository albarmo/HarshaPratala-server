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
    console.log("register user");
    try {
      let { email, firstname, lastname, age } = req.body;
      let userValues = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        age: req.body.age,
      };

      Users.RegisterNewUser(userValues, (error, userResult) => {
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          res
            .status(201)
            .json({ message: `success create product ${userResult.email}` });
        }
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}

module.exports = UserController;
