import * as UsersService from './users.service';

export const getAll = (req, res) => {
  const users = UsersService.getAll();

  res.statusCode = 200;
  res.send(users);
};

export const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = UsersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

export const getById = (req, res) => {
  const { id } = req.params;
  const foundUser = UsersService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 201;
  res.send(foundUser);
};

export const removeById = (req, res) => {
  const { id } = req.params;
  const foundUser = UsersService.removeById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  UsersService.removeById(id);

  res.statusCode = 204;
};

export const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundUser = UsersService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  UsersService.update({
    id,
    name,
  });

  res.statusCode = 201;

  res.send(foundUser);
};
