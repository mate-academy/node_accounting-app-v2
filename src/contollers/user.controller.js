import * as usersService from '../services/users.service.js';

export const get = (req, res) => {
  res.send(usersService.getAll());
};

export const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.statusCode = 200;
  res.send(user);
};

export const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

export const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  usersService.remove(id);

  res.sendStatus(204);
};

export const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = usersService.update({ id, name });

  res.send(updatedUser);
};
