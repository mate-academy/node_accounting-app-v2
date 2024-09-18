let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((person) => person.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    id: Math.floor(Math.random() * 1000),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = getUserById(+id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((person) => person.id !== +id);
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
