const { v4: uuidv4 } = require('uuid');

let users = [
  { id: '1', name: 'katya' },
  { id: '2', name: 'lyosha' },
];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id) || null;
};

const create = (name) => {
  const user = {
    id: uuidv4(),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  const newUsers = users.filter((item) => item.id !== id);
  const success = newUsers.length !== users.length;

  if (success) {
    users = newUsers;
  }

  return success;
};

const update = (id, updates) => {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return null;
  }
  Object.assign(user, updates);

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
