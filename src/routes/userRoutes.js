const express = require('express');
const userController = require("../controllers/userControllers");
const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers());

module.exports = userRoutes;
