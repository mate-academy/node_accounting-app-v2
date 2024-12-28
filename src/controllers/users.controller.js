const usersService = require('../services/users.service.js');

const get = (req, res) => {
  return res.status(200).json(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const isUser = usersService.getById(id);

  if (!isUser) {
    return res.status(404).json({ message: 'User does not exist!' });
  }

  return res.status(200).json(isUser);
};

const create = (req, res) => {
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.status(400).end();
  }

  const newUser = usersService.create(data);

  return res.status(201).json(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const index = usersService.indexOfUser(id);

  if (index === -1) {
    return res.status(404).end();
  }

  const updatedUser = usersService.update(index, data);

  return res.status(200).json(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const index = usersService.indexOfUser(id);

  if (index === -1) {
    return res.status(404).json('Not Found');
  }

  usersService.removeUser(index);

  return res.status(204).end();
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
