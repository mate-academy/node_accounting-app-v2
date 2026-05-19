let users = [];
let nextUserId = 0;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  nextUserId++;

  const user = {
    id: nextUserId,
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  user.name = name;

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const reset = () => {
  users = [];
  nextUserId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
