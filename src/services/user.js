const { v4: uuidv4 } = require('uuid');
let Users = [
  {
    id: '870ed68e-d67d-4354-b4b0-2b5d27324e0f',
    name: 'proba',
  },
  {
    id: 'c61b9b1c-53ad-439d-8b9a-57eded061d1c',
    name: 'proba2',
  },
  {
    id: 'a34f5579-2917-429f-9f3b-313888fdf5b3',
    name: 'proba3',
  },
];

const getAll = () => {
  return Users;
};

const getById = (id) => {
  return Users.find((user) => user.id === id);
};

const create = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  };

  Users.push(newUser);

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
  Users = Users.filter((user) => user.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
