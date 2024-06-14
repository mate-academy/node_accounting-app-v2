let users = [];
let nextId = 0;

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find((u) => u.id === Number(userId));
};

const existUser = (id) => {
  return users.some((u) => u.id === Number(id));
};

const addUser = (name) => {
  const newUser = {
    id: nextId++,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateUser = ({ id, name }) => {
  const userToUpdate = getUserById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  reset,
  getUserById,
  deleteUser,
  addUser,
  existUser,
  updateUser,
};
