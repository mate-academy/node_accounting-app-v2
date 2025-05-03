const userService = require('../services/users.service.js');

const isNameCorrect = (name) => {
  if (typeof name !== 'string' || !name || name.trim() === '') {
    return false;
  }

  return true;
};

const get = (req, res) => {
  res.send(userService.getUsers());
};

const getOne = (req, res) => {
  let { id } = req.params;

  id = +id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!isNameCorrect(name)) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  let { id } = req.params;

  id = +id;

  if (!userService.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  let { id } = req.params;

  id = +id;

  const { name } = req.body;
  // console.log(id, name);

  if (!isNameCorrect(name)) {
    res.sendStatus(400);

    return;
  }
  // console.log(userService.getUser(id));

  if (!userService.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateUser(id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  get,
  getOne,
  add,
  remove,
  update,
};
