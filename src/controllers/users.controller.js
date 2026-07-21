import * as usersService from '../services/users.service.js';

export function getAll(req, res) {
  const users = usersService.getAll();

  res.json(users);
}

export function getById(req, res) {
  const userId = Number(req.params.id);

  if (!(userId >= 0)) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(userId);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
}

export function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = usersService.create(name);

  res.status(201).json(user);
}

export function deleteById(req, res) {
  const user = usersService.deleteById(Number(req.params.id));

  if (user) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

export function update(req, res) {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!(id >= 0) || !name) {
    return res.sendStatus(400);
  }

  const user = usersService.update({ id, name });

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
}
