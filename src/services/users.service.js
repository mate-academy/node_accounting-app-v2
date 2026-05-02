let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const createUser = (name) => {
  const user = {
    id: users.length + 1,
    name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name: name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

module.exports = {
  users,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
