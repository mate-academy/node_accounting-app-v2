const uuidv4 = require('uuidv4'); 

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find(person = person.id === userId) || null;
};

const updateUser = (personId, name) => {
  const user = getUserById(personId);

  Object.assign(user, { name });

  return user;
};

const addUser = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  }; 

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  addUser,
  deleteUser,
};
