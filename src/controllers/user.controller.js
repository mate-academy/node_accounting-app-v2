/* eslint-disable */
const userService = require('../services/user.service.js');

function get(req, res) {
  res.send(userService.getAll());
}

function getOne(req, res) {
  const { id } = req.params;

  const person = userService.getById(id);

  if (!person) {
    res.sendStatus(404);

    return;
  }

  res.send(person);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
}

function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  // res.sendStatus(200);
  const updatedUser = userService.update({ id, name });

  res.json(updatedUser);
}

function remove(req, res) {
  const { id } = req.params;
  const userId = Number(id);

  if (!userService.getById(userId)) {
    return res.sendStatus(404);
  }

  userService.remove(userId);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
