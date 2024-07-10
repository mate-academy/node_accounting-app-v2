let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((person) => person.id === Number(id));
};

const removeUserById = (id) => {
  users = users.filter((person) => person.id !== Number(id));
};

const createUserByName = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const updateUserData = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  removeUserById,
  createUserByName,
  updateUserData,
};
