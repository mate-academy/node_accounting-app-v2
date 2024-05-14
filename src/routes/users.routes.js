const express = require('express');
const router = express.Router();

const createRouter = ({ userService }) => {
  router.get('/', (req, res) => {
    const users = userService.getAll();

    res.send(users);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = userService.getOne(id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  });

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const user = userService.createOne({ name });

    res.status(201).send(user);
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = userService.updateOne(id, { name });

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleted = userService.deleteOne(id);

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  return router;
};

module.exports = { createRouter };
