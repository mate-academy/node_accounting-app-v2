import * as usersService from '../services/users';

export const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

export const findOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  res.send(foundUser);
};

export const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addOne(name);

  res.statusCode(201);
  res.send(newUser);
};

export const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.updateOne(userId, name);

  res.send(updatedUser);
};

export const deleteOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  usersService.deleteOne(userId);

  res.sendStatus(204);
};
