const { Router } = require('express');

const usersRouter = Router();
const mockUsers = new Map();

usersRouter.get('/', (req, res) => {
  res.status(200).send([...mockUsers.values()]);
});

usersRouter.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required!');
  }

  const maxId = Math.max(...mockUsers.keys(), 0);
  const newId = maxId + 1;

  const newUser = {
    id: newId,
    name,
  };

  mockUsers.set(newId, newUser);

  res.status(201).send(newUser);
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!mockUsers.has(Number(id))) {
    return res.sendStatus(404);
  }

  res.status(200).send(mockUsers.get(Number(id)));
});

usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  if (!mockUsers.has(Number(id))) {
    return res.sendStatus(404);
  }

  mockUsers.delete(Number(id));
  res.sendStatus(204);
});

usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mockUsers.has(Number(id)) || typeof name !== 'string') {
    return res.sendStatus(404);
  }

  const userToUpdate = mockUsers.get(Number(id));

  userToUpdate.name = name;

  res.status(200).send(userToUpdate);
});

const resetMockUsers = () => {
  mockUsers.clear();
};

module.exports = { usersRouter, resetMockUsers, mockUsers };
