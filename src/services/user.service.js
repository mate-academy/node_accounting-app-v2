const { getMaxId } = require('../utils/helpers.js');

let users = [];

function init() {
  users = [];
}

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  const newUser = {
    id: getMaxId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(+id);
  const index = users.indexOf(user);

  Object.assign(user, { name });

  users.splice(index, 1, user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

module.exports = {
  init,
  getAll,
  create,
  getById,
  remove,
  update,
};
