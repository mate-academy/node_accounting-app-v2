let users, nextId;

const init = () => {
  users = [];
  nextId = 0;
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((u) => u.id === id) || null;
};

const createUser = (userName) => {
  const newUser = {
    id: nextId,
    name: userName,
  };

  nextId++;

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  users = newUsers;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  init,
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
