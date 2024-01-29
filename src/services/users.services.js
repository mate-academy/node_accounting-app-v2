'use strict';

const users = [{
  id: 1, imie: 'Marcin',
}, {
  id: 2, imie: 'Blanka',
}];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const user = users.find(el => el.id === userId);

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
};
