let users = [];

const getAll = () => users;

const create = (name) => {
  const user = {
    id: Date.now(),
    name,
  };

  users.push(user);

  return user;
};

const getById = (id) => users.find((user) => user.id === +id) || null;

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    user.name = name;
  }

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
