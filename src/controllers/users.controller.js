const usersServise = require('../services/users.service');

const get = (req, res) => {
  const users = usersServise.getAll();

  res.status(200).send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersServise.getUser(id);

  if (!id) {
    res.status(400).send();
  }

  if (!user) {
    res.status(404).send();
  }

  res.status(200).send(user);
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
  const { id } = req.params;
  const { name } = req.body;

  if (id && name) {
    const finded = usersServise.getUser(id);

    if (finded) {
      const updated = usersServise.updateUser(id, name);

      res.status(200).send(updated);
    } else {
      res.status(404).send();
    }
  }

  req.status(400).send();
};

const deleting = (req, res) => {
  const { id } = req.params;
  const user = usersServise.getUser(id);

  if (user) {
    usersServise.deleteUser(id);

    res.status(204).send();
  }

  res.status(404).send();
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  deleting,
};
