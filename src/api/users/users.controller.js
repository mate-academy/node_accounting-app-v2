const { usersService } = require('../../services/users/users.service');
const getAll = (req, res) => {
  res.send(usersService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.status(201).send(usersService.create(name));
};

const getById = (req, res) => {
  const user = usersService.getById(+req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const remove = (req, res) => {
  const user = usersService.getById(+req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteById(+req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  res.send(usersService.update({ id, name }));
};

module.exports = {
  usersController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
