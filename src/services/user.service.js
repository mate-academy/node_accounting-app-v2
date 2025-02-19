let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const newUser = { id: users.length, name };

  users.push(newUser);

  return newUser;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
