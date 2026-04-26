/* eslint-disable curly */
const { v4: uuidv4 } = require('uuid');

const users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const user = { id: uuidv4(), name };

  users.push(user);

  return user;
};

const deleteById = (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return;

  const [user] = users.splice(index, 1);

  return user;
};

const update = ({ id, ...rest }) => {
  const user = users.find((u) => u.id === id);

  if (!user) return;

  return Object.assign(user, { ...rest });
};

const clear = () => {
  users.splice(0);
};

module.exports = {
  usersService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
    clear,
  },
};
