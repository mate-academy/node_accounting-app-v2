let users = [];

const getAll = () => {
  return users;
};

const create = (name) => {
  const newUser = {
    id: users[users.length - 1]?.id + 1 || 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  reset,
};
