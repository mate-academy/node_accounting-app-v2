let users = [];
let nextId = 0;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const newUser = {
    id: nextId++,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = (id, name) => {
  const prevData = getById(id);

  return Object.assign(prevData, { name });
};

const reset = () => {
  users = [];
  nextId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
