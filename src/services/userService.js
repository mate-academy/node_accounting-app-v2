let users = [];

const initUsers = () => {
  users = [];
};

const idGenerator = () => {
  if (!users.length) {
    return 1;
  }

  const userIds = users.map((user) => user.id);

  return Math.max(...userIds) + 1;
};

const createUserService = (name) => {
  const newUser = { id: idGenerator(), name };

  users.push(newUser);

  return newUser;
};

const getUsersService = () => users;

const getUserByIdService = (id) => {
  return users.find((user) => user.id === Number(id));
};

const updateUserService = (id, name) => {
  const user = users.find((use) => use.id === parseInt(id));

  if (!user) {
    return null;
  }
  user.name = name;

  return user;
};

const deleteUserService = (id) => {
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return false;
  }
  users.splice(userIndex, 1);

  return true;
};

module.exports = {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  initUsers,
};
