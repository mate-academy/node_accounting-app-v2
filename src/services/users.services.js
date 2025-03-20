let users = [];

const initUsers = () => (users = []);

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const createUser = (name) => {
  const lastId = users.length ? users[users.length - 1].id : 0;
  const newUser = { id: lastId + 1, name };

  users.push(newUser);

  return newUser;
};

const updateUser = (user, name) => {
  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

module.exports = {
  initUsers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
