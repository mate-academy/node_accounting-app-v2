const usersServise = require('../services/users.service');

const checkId = (req, res, next, value) => {
  if (!value) {
    res.status(400).send();

    return;
  }

  const user = usersServise.getUser(value);

  if (!user) {
    res.status(404).send();

    return;
  }

  req.check = user;
  next();
};

const get = (req, res) => {
  const users = usersServise.getAll();

  res.status(200).send(users);
};

const getOne = (req, res) => {
  res.status(200).send(req.check);
};

const post = (req, res) => {
  const { name } = req.body;

  if (name) {
    const added = usersServise.addNew(name);

    res.status(201).send(added);
  }

  res.status(400).send();
};

const patch = (req, res) => {
  const { name } = req.body;

  if (name) {
    const updated = usersServise.updateUser(req.check.id, name);

    res.status(200).send(updated);
  } else {
    req.status(400).send();
  }
};

const deleting = (req, res) => {
  usersServise.deleteUser(req.check.id);
  res.status(204).send();
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  deleting,
  checkId,
};
