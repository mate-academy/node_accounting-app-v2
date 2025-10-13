let users = [];

const getUsers = () => {
  return users;
};

const getUser = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const createUser = (name) => {
  const newUser = {
    id: Math.max(0, ...users.map((user) => user.id)) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateUser = ({ id, name }) => {
  const userToUpdate = getUser(+id);

  if (!userToUpdate) {
    return null;
  }

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  users,
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getUsers,
  resetUsers,
};
