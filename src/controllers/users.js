'use strict';

const { UsersService } = require('../services/users');

const initUserController = () => {
  const usersService = new UsersService();

  return {
    usersService,

    addUser(req, res) {
      if (!req.body.name) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      res
        .status(201)
        .send(usersService.addUser(req.body.name));
    },

    getAllUsers(req, res) {
      res
        .status(200)
        .send(usersService.getAllUsers());
    },

    getUserById(req, res) {
      if (!req.params.id) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      const foundUser = usersService.getUserById(req.params.id);

      if (!foundUser) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(foundUser);
    },

    deleteUserById(req, res) {
      if (!usersService.deletUserById(req.params.id)) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(204)
        .end();
    },

    updateUserById(req, res) {
      if (!req.params.id || !usersService.isValidUserBody(req.body, true)) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      const updatedUser = usersService
        .updateUserById(req.params.id, req.body);

      if (!updatedUser) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(updatedUser);
    },
  };
};

module.exports = {
  initUserController,
};
