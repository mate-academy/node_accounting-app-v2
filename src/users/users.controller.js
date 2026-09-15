const userService = require('./users.service.js');

exports.getUsers = (req, res) => {
  const users = userService.getAll();

  res.status(200).json(users);
};

exports.getUser = (req, res) => {
  const user = userService.getById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.status(200).json(user);
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    res.sendStatus(400);

    return;
  }

  const users = userService.create({ name: name.trim() });

  res.status(201).json(users);
};

exports.updateUser = (req, res) => {
  const user = userService.getById(Number(req.params.id));
  const changes = req.body;

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.status(200).json(userService.update(user.id, changes));
};

exports.removeUser = (req, res) => {
  const deleted = userService.remove(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.sendStatus(204);
};
