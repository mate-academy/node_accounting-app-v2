let users = [
  {
    id: 1,
    name: 'Anna',
  },
];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => String(item.id) === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: Math.trunc(Date.now() + Math.random()),
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => String(user.id) !== id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { ...user, name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  clear,
};
