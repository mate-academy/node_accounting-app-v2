let users = [];

const allUsers = () => {
  return users;
};

const userById = (id) => {
  return users.find((item) => item.id === Number(id));
};

const createUser = (name) => {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const updateUser = (id, name) => {
  const user = users.find((item) => item.id === Number(id));

  Object.assign(user, { name });
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  allUsers,
  userById,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
