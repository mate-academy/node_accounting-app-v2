let users = [];
let userIdCounter = 1;

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const createUser = (name) => {
  const user = {
    name,
    id: userIdCounter++,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
