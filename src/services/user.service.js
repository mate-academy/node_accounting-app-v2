// const { v4: uuidv4 } = require('uuid');

let users = [
  // { id: '1', name: 'test1' },
  // { id: '2', name: 'test2' },
];

let idCounter = users.length;

const getAll = () => {
  return users;
};

const create = (name) => {
  idCounter++;

  const user = {
    id: idCounter,
    name,
  };

  users.push(user);

  return user;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
