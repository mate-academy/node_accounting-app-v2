let users = [];
let id = 1;

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const user = { id, name };

  id++;
  users.push(user);

  return user;
};

const getUserById = (userId) => {
  const findUser = users.find((user) => user.id === +userId);

  return findUser;
};

const deleteUser = (userId) => {
  users = users.filter((user) => user.id !== +userId);
};

const updateUser = (userId, name) => {
  const findUser = users.find((user) => user.id === +userId);

  findUser.name = name;

  return findUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  resetUsers,
};
