let users = [];
let nextUserId = 1;

const getAllUsersService = () => {
  return users;
};

const getUserByIdService = (id) => {
  const user = users.find((people) => people.id === +id) || null;

  return user;
};

const createUserService = (newName) => {
  const newUser = {
    id: nextUserId++,
    name: newName,
  };

  users.push(newUser);

  return newUser;
};

const updateUserService = (id, name) => {
  const user = getUserByIdService(id);

  Object.assign(user, { name });

  return user;
};

const deleteUserService = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const usersReset = () => (users = []);

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  usersReset,
};
