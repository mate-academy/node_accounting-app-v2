const { validationResult, matchedData } = require('express-validator');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const userId = req.params.id;

  const user = userService.getById(userId);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  res.send(user);
};

const create = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });

  const newUser = userService.create(data);

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const userId = req.params.id;
  const data = matchedData(req, { locations: ['body'] });

  const user = userService.getById(userId);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  const updatedUser = userService.updateById(userId, data);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const id = req.params.id;

  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  userService.deleteById(id);

  res.status(204).send();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
