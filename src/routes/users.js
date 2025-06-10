const express = require('express');

module.exports = function (users) {
  const router = express.Router();

  let userIdCounter = 1;

  // POST /users — criar usuário
  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  // GET /users — listar todos usuários
  router.get('/', (req, res) => {
    res.json(users);
  });

  // GET /users/:id — pegar usuário por id
  router.get('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });

  // PATCH /users/:id — atualizar usuário
  router.patch('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name } = req.body;

    if (name) {
      user.name = name;
    }

    res.json(user);
  });

  // DELETE /users/:id — apagar usuário
  router.delete('/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(index, 1);
    res.status(204).end();
  });

  return router;
};
