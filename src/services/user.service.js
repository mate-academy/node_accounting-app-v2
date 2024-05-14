let users = [];

const start = () => {
  users = [];
};

const getAll = () => users;

const getById = (id) => users.find((user) => user.id === +id) || null;

const create = (data) => {
  const newUser = {
    id: users.length + 1,
    ...data,
  };

  users.push(newUser);

  return newUser;
};

const deleteById = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateById = (id, data) => {
  const user = getById(id);

  Object.assign(user, data);

  return user;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
