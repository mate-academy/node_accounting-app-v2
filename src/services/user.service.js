const { generateID } = require('../utils/generateID');
let users = [];

const start = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === +id);
};

const create = (name) => {
  const user = {
    name: name,
    id: generateID(),
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    Object.assign(user, { name });

    return user;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  update,
};
