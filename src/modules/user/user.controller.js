'use strict';

const { UserService } = require('./user.service');

class UserController {
  async getUsers(req, res) {
    const users = await UserService.getUsers();

    res.statusCode = 200;
    res.send(users);
  }

  async getUserById(req, res) {
    const { userId } = req.params;

    const user = await UserService.getUserById(userId);

    if (user) {
      res.statusCode = 200;
      res.send(user);
    }

    res.statusCode = 404;
    res.send('User not found');
  }

  async addUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 404;
      res.send('fill the name');
    }

    const user = await UserService.createUser(name);

    res.statusCode = 201;
    res.send(user);
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    const user = await UserService.getUserById(userId);

    if (!user) {
      res.statusCode = 404;
      res.send('user not found');
    }

    await UserService.deleteUser(userId);

    res.statusCode = 200;
    res.send('deleted successfully');
  }

  async updateUser(req, res) {
    const { userId } = req.params;
    const { name } = req.body;

    const user = await UserService.getUserById(userId);

    if (!user) {
      res.statusCode = 404;
      res.send('user not found');
    }

    if (!name) {
      res.statusCode = 404;
      res.send('fill the name to update');
    }

    const updatedUser = await UserService.updateUser(userId, { name });

    res.statusCode = 203;
    res.send(updatedUser);
  }
}

const userController = new UserController();

module.exports = { userController };
