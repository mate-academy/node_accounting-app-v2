const {
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getAllUsersService,
} = require('../services/user-service');

const createUserController = (req, res) => {
  try {
    const user = req.body;
    const newUser = createUserService(user);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ issue: error.message });
  }
};

const getAllUsersController = (req, res) => {
  return res.status(200).json(getAllUsersService());
};

const getUserByIdController = (req, res) => {
  const { id } = req.params;

  try {
    const user = getUserByIdService(Number(id));

    res.status(200).json(user);
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const updateUserController = (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = updateUserService(Number(id), user);

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const deleteUserController = (req, res) => {
  const { id } = req.params;

  try {
    deleteUserService(Number(id));

    res.status(204).end();
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,

  getUserByIdController,
  updateUserController,
  deleteUserController,
};
