const { generateNextId } = require('../utils/generateNextId.utility');

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const newUser = {
    id: generateNextId(users),
    name,
  };

  users = [...users, newUser];

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
