const userService = require('../service/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  return res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.add(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const user = userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(Number(userId));
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const user = userService.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.update({
    id: user.id,
    name,
  });

  res.send(user);
};

module.exports = {
  getAll,
  getUser,
  add,
  remove,
  update,
};
