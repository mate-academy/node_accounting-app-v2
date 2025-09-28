const express = require('express');

const router = express.Router();

let users = [
  { id: 1, name: 'Софія' },
  { id: 2, name: 'Олег' },
  { id: 3, name: 'Анна' },
];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  if (!newUser.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  user.name = req.body.name;

  res.status(200).json(user);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const userExists = users.some((u) => u.id === id);

  if (!userExists) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  users = users.filter((u) => u.id !== id);

  res.status(200).json({ message: 'Користувача видалено' });
});

module.exports = router;
