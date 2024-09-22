let users = [];
let userId = 1;

const resetUsers = () => {
  users = [];
};

const getAllusers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    name,
    id: userId,
  };

  userId++;

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

  return users;
};

module.exports = {
  getAllusers,
  getUserById,
  updateUser,
  removeUser,
  createUser,
  resetUsers,
};
