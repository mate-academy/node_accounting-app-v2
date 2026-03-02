const userService = require('../services/users.service');

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = userService.createUser(name);

  res.status(201).json(user);
};

exports.getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

exports.deleteUserById = (req, res) => {
  const id = Number(req.params.id);
  const deleted = userService.deleteUserById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(204).send();
};

exports.updateUserById = (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  if (!data || !data.name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updated = userService.updateUserById(id, data);

  res.json(updated);
};
