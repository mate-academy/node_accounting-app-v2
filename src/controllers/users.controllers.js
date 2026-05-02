const usersService = require('../services/users.service.js');

const get = (req, res) => {
  res.send(usersService.getAllUsers());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Bad request');

    return;
  }

  const user = usersService.createUser(name);

  res.statusCode = 201;

  res.send(user);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.statusCode = 400;
    res.send('Bad request');

    return;
  }

  const user = usersService.getUserById(id);

  if (!user) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.statusCode = 400;
    res.send('Bad request');

    return;
  }

  if (!usersService.getUserById(id)) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getUserById(id);

  if (!user) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  if (typeof name !== 'string') {
    res.statusCode = 400;
    res.send('Bad request');

    return;
  }

  const updatedUser = usersService.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
