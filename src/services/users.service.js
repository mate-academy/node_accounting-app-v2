let users = [];

const usersInit = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const getUser = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const createUser = ({ name }) => {
  const newUser = {
    id: new Date().getTime(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (id, body) => {
  return Object.assign(getUser(id), { ...body });
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

module.exports = {
  usersInit,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
