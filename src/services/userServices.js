const { generateUniqueId } = require('../utils/generateUniqueId');

let users = [];

const clearUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const createUserServices = (name) => {
  const id = generateUniqueId();
  const newUser = {
    id: id,
    name,
  };

  users.push(newUser); // Добавляем нового пользователя в массив

  return newUser;
};

const getUserById = (id) => users.find((user) => user.id === Number(id));

const deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0]; // Возвращаем удалённого пользователя
  }

  return null; // Пользователь не найден
};

const updateUser = (id, newData) => {
  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...newData };

    return users[userIndex];
  }

  return null;
};

module.exports = {
  getAllUsers,
  createUserServices,
  getUserById,
  deleteUser,
  updateUser,
  clearUsers,
};
