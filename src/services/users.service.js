let users = [];

const getUsers = () => {
  return users;
};

const createUser = (name) => {
  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return;
  }

  return users.splice(userIndex, 1);
};

const updateUser = ({ id, name }) => {
  const user = users.find((person) => person.id === id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports.usersService = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  resetUsers,
};
