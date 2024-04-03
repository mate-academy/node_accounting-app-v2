const { v4: uuidv4 } = require('uuid');
let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  return Object.assign(user, { name });
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  init,
};
