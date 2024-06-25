const { v4: uuidv4 } = require('uuid');

const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => Number(user.id) === Number(id));
};

const addUserByName = (name) => {
  const user = {
    id: generateUniqNumberId(),
    name,
  };

  users.push(user);

  return user;
};

const removeUserById = (id) => {
  users = users.filter((user) => user.id !== Number(id));

  return users;
};

const updateUserById = (currentUser, name) => {
  return Object.assign(currentUser, { name });
};

module.exports = {
  users,
  getAllUsers,
  getUserById,
  addUserByName,
  removeUserById,
  updateUserById,
};
