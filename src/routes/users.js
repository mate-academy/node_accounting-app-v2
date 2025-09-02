const express = require('express');

module.exports = function (users) {
  const router = express.Router();

  let userIdCounter = 1;

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (name === undefined) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  router.get('/', (req, res) => {
    res.json(users);
  });

  router.get('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  router.patch('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (name === undefined) {
      return res.status(400).json({ message: 'No updatable fields provided' });
    }

    user.name = name;
    res.json(user);
  });

  router.delete('/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);

    res.status(204).end();
  });

  return router;
};
