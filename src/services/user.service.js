let users = [];
let nextUserId = 1;

const reset = () => {
  users = [];
  nextUserId = 1;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((u) => u.id === Number(id)) || null;
};

const create = (name) => {
  const user = { name, id: nextUserId++ };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((u) => u.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
