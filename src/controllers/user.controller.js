const userService = require('../services/user.service.js');
const { checkIsReqBodyValid } = require('../helpers/checkIsReqBodyValid.js');

const getAll = (req, res) => res.send(userService.getAll());

const create = (req, res) => {
  const { ...params } = req.body;

  const listOfExpectedParams = [
    { key: 'name', type: 'string' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(params, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);
    return;
  }

  const newUser = userService.create(params.name);
  res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(id);

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);
    return;
  }

  res.send(foundUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);
    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { ...params } = req.body;

  const listOfExpectedParams = [
    { key: 'name', type: 'string' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(params, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);
    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);
    return;
  }

  const updatedUser = userService.update(id, name);
  res.send(updatedUser);
};

module.exports = { getAll, getOne, create, remove, update };
