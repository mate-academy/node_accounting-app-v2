"use strict";

const express = require("express");
const usersController = require("../endpoints/usersControllers");
const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.post("/", usersController.addUser);

usersRouter.patch("/:id", usersController.updateUser);

usersRouter.delete("/:id", usersController.removeUser);

module.exports = {
  usersRouter,
};
