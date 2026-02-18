const express = require('express');
const userController = require('./users.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.send(userController.getAll());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const targetUser = userController.getById(+id);

  if (!targetUser) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.send(targetUser);
});

router.post('/', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name?.trim() || typeof name !== 'string') {
    res.statusCode = 400;
    res.end();

    return;
  }

  const user = userController.create(name);

  res.statusCode = 201;
  res.send(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteStatus = userController.deleteUser(+id);

  if (!deleteStatus) {
    res.statusCode = 404;

    res.end();

    return;
  }

  res.statusCode = 204;
  res.end();
});

router.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name?.trim()) {
    res.statusCode = 400;
    res.end();

    return;
  }

  const user = userController.update(+id, name);

  if (!user) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.send(user);
});

module.exports = {
  router,
};
