let users = [];
let nextId = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  const user = {
    id: nextId++,
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const reset = () => {
  users = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
