let users = [];

const getId = () =>
  users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

const getAllUsers = () => {
  return [...users];
};

const createUser = (name) => {
  const user = { id: getId(), name };

  users.push(user);

  return user;
};

const getUser = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateUsers = ({ id, name }) => {
  const user = getUser(id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUsers,
  resetUsers,
};
