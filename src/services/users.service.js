let users = [];

const getAll = () => users;

const getById = (id) => users.find((user) => user.id === Number(id)) || null;

const create = (name) => {
  const nextId = users[users.length - 1]?.id + 1 || 0;
  const newUser = {
    id: nextId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};
