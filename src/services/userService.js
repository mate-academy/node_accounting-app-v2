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
  return users.find((u) => u.id === +id) ?? null;
};

const updateById = (id, name) => {
  const user = getById(id);

  const updatedUser = { ...user, name };

  return updatedUser;
};

const removeById = (id) => {
  users = users.filter((u) => u.id !== +id);
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  updateById,
  reset,
};
