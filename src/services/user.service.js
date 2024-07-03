let users = [];

const getId = () => {
  return users.length ? Math.floor(Math.random() * 37) : 1;
};

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const createUser = (userName) => {
  const newUser = {
    id: getId(),
    name: userName,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  users = users.filter((item) => item.id !== id);

  return user;
};

const patchUser = (id, name) => {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  const newUser = {
    ...user,
    name: name,
  };

  users = users.map((item) => {
    return item.id === id ? { ...item, ...newUser } : item;
  });

  return newUser;
};

const deleteUsers = () => {
  users = [];
};

const getUsersArray = () => users;

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  patchUser,
  deleteUsers,
  getUsersArray,
};
