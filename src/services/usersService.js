const getRandomId = () => {
  return Math.floor(Math.random() * 1000);
};

let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const user = {
    id: getRandomId(),
    name: name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  resetUsers,
};
