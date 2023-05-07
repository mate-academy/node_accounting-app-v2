'use strict';

const { UserService } = require('../services/userService.js');
const userService = new UserService();

class UserController {
  getUsers(req, res) {
    const users = userService.getUsers();

    res.status(200).send(users);
  }
}

module.exports = {
  UserController,
};
