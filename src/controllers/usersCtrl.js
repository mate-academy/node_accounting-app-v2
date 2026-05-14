'use strict';

const usersService = require('../services/usersSvc');

const usersController = {
  create(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: 'name is required' });

      return;
    }

    const user = usersService.create(name);

    res.status(201).json(user);
  },

  getAll(req, res) {
    const users = usersService.getAll();

    res.status(200).json(users);
  },

  getById(req, res) {
    const { id } = req.params;
    const user = usersService.getById(Number(id));

    if (!user) {
      res.status(404).json({ error: 'user not found' });

      return;
    }

    res.status(200).json(user);
  },

  update(req, res) {
    const { id } = req.params;
    const user = usersService.update(Number(id), req.body);

    if (!user) {
      res.status(404).json({ error: 'user not found' });

      return;
    }

    res.status(200).json(user);
  },

  delete(req, res) {
    const { id } = req.params;
    const deleted = usersService.delete(Number(id));

    if (!deleted) {
      res.status(404).json({ error: 'user not found' });

      return;
    }

    res.status(204).send();
  },
};

module.exports = usersController;
