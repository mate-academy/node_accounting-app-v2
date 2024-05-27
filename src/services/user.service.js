let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const user = {
    id: users.length,
    name: name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  reset,
};
