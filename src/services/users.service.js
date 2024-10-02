const { data } = require('../data/data');

const getAll = () => {
  return data.users;
};

const create = (name) => {
  const user = {
    id: +Date.now(),
    name,
  };

  data.users.push(user);

  return user;
};

const getById = (id) => {
  const user = data.users.find((u) => u.id === id);

  return user;
};

const deleteById = (id) => {
  const index = data.users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = data.users.splice(index, 1);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
};

const usersService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};

module.exports = {
  data,
  usersService,
};
