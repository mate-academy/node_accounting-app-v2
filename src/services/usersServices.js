const { v4: uuidv4 } = require('uuid');
const newId = uuidv4();
const users = [];

const resetUsers = () => {
  users.splice(0, users.length);
};

const getUsers = () => {
  return users;
};

const getOneUser = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);
};

const removeUser = (id) => {
  return users.filter((user) => user.id !== id);
};

const updateUser = ({ id, name }) => {
  const selectedUser = getOneUser(id);

  Object.assign(selectedUser, { name });

  return selectedUser;
};

module.exports = {
  resetUsers,
  createUser,
  getOneUser,
  getUsers,
  removeUser,
  updateUser,
};
