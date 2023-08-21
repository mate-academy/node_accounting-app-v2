'use strict';

let users = [];

const reset = () => {
  users.length = 0;
};

const getAllUsers = (req, res) => res.send(users);

const getUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = users.find((user) => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const postUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { name } = req.body;

  if (!name || !name.trim().length || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: users.length,
    name: name.trim(),
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = users.find((user) => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  users = users.filter((user) => user.id !== foundUser.id);
  res.sendStatus(204);
};

const patchUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = users.find((user) => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || !name.trim().length || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  users = users.map((user) =>
    user.id === foundUser.id
      ? {
        ...user,
        name,
      } : user
  );

  res.statusCode = 200;
  res.send(users.find((user) => user.id === +userId));
};

module.exports = {
  users,
  reset,
  getAllUsers,
  getUser,
  postUser,
  deleteUser,
  patchUser,
};
