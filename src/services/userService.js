const users = [];
let userIdCounter = 1;

const createUserService = (name) => {
  const newUser = { id: userIdCounter++, name };

  users.push(newUser);

  return newUser;
};

const getUsersService = () => users;

const getUserByIdService = (id) =>
  users.find((user) => user.id === parseInt(id));

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
};
