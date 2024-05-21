const { errorHandler } = require('../helpers/errorHandler');
const { usersService, initUserService } = require('../services/users.service');
const { STATUS_CODES } = require('../variables/variables');
const express = require('express');

const usersController = () => {
  initUserService();

  const usersRoutes = express.Router();

  usersRoutes.get('/', (req, res) => {
    const users = usersService.getUsers();

    res.status(STATUS_CODES.ok).send(users);
  });

  usersRoutes.post('/', (req, res) => {
    try {
      const user = req.body;

      const newUser = usersService.createUser(user);

      res.status(STATUS_CODES.created).send(newUser);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  usersRoutes.get('/:id', (req, res) => {
    try {
      const id = req.params.id;

      const user = usersService.getUserById(+id);

      res.status(STATUS_CODES.ok).send(user);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  usersRoutes.delete('/:id', (req, res) => {
    try {
      const id = req.params.id;

      usersService.deleteUser(+id);
      res.status(STATUS_CODES.noContent).end();
    } catch (err) {
      errorHandler(err, res);
    }
  });

  usersRoutes.patch('/:id', (req, res) => {
    try {
      const id = req.params.id;
      const params = req.body;

      const updatedUser = usersService.updateUser(+id, params);

      res.status(STATUS_CODES.ok).send(updatedUser);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  return usersRoutes;
};

module.exports = {
  usersController,
};
