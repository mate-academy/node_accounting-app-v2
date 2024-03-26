const { v4: uuidv4 } = require('uuid');

let users = [];

const getAll = () => {
  return users;
};

const getOne = (id) => {
  const user = users.find((item) => item.id === id) || null;

  return user;
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
  const newUsers = users.filter((el) => el.id !== id);
  const notFound = newUsers.length === users.length;

  users = newUsers;

  return notFound;
};

const update = (id, name) => {
  const user = users.find((el) => el.id === id) || null;

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
