const {
  findItemById,
  getId,
  getFilteredArrayById,
} = require('../services/helper');

let users = [];

const clearUsersData = () => {
  users = [];
};

const getUsersData = () => {
  return users;
};

const getOneUserData = (id) => {
  return findItemById(users, id);
};

const addUser = ({ name }) => {
  const user = {
    id: getId(users),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  const newUsers = getFilteredArrayById(users, id);

  users = newUsers;

  return newUsers;
};

const updateUserData = (userId, newName) => {
  users = users.map((user) => {
    if (Number(user.id) === Number(userId)) {
      return {
        ...user,
        name: newName,
      };
    }

    return user;
  });

  return getOneUserData(userId);
};

module.exports = {
  getUsersData,
  getOneUserData,
  addUser,
  removeUser,
  updateUserData,
  clearUsersData,
};
