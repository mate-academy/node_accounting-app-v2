let users = [];

const init = () => {
  users = [];
};

const getAll = () => users;

const getById = (id) => users.find((user) => user.id === Number(id)) || null;

const create = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  init,
};
