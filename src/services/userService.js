let users = [];
let currentId = 1;

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    name,
    id: currentId,
  };

  currentId++;
  users.push(user);

  return user;
};

const patchUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
  resetUsers,
};
