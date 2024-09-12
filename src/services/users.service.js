let users = [];

const getAll = () => {
  return users;
};

const create = (name) => {
  const user = {
    name,
    id: new Date().getTime(),
  };

  users.push(user);

  return user;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = ({ id, name }) => {
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
