const usersService = require('../services/usersService');
const codeStatus = require('../codeStatuses');

const getAllUsers = (_, res) => {
  res.codeStatus = codeStatus.SUCCESS;
  res.send(usersService.getAllUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.status(codeStatus.SUCCESS).send(choosedUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }
  res.statusCode = codeStatus.CREATED;

  res.send(usersService.addUser(name));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedUser = usersService.updateUserName({ id, name });

  res.send(updatedUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(id)) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  usersService.deleteUser(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
