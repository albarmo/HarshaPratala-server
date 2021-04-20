const UserController = require("../controllers/UserController");
const userRouter = require("express").Router();

userRouter.get("/", UserController.getAllUser);
userRouter.post("/", UserController.addNewUser);

module.exports = userRouter;
