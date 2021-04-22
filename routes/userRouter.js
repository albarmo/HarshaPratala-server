const UserController = require("../controllers/UserController");
const userRouter = require("express").Router();

userRouter.get("/", UserController.getAllUser);
userRouter.post("/", UserController.addNewUser);
userRouter.put("/:id", UserController.editUserData);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
