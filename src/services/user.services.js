let users = [];

const getAll = () => {
  return users;
};

const getUserById = (id) => {
  const oneUser = users.find((user) => user.id === Number(id));

  return oneUser;
};

const create = (name) => {
  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getUserById,
  create,
  remove,
  update,
  resetUsers,
};
