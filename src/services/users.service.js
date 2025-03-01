let users = [];

const getId = () => {
  return users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
};

const getAll = () => {
  return users;
};

const getById = (id) => users.find((u) => u.id === id);

const create = (name) => {
  const newUser = {
    id: getId() + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((u) => u.id !== id);
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  reset,
  update,
};
