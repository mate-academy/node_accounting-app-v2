const { v4: uuidv4 } = require('uuid');
const users = [
  {
    id: 1,
    name: 'mirek',
  },
];

const resetUsers = () => {
  users.splice(0, users.length);
};

const getUsers = () => {
  return users;
};

const getOneUser = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);

    return true;
  }

  return false;
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
