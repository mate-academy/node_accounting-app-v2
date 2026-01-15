let users = [];

const getAll = () => {
  if (users.length === 0) {
    return [];
  }

  return users;
};

const getUserById = (id) => {
  return users.find((user) => Number(user.id) === Number(id)) || null;
};

const create = (name) => {
  const user = {
    id: Date.now(),
    name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
};

const remove = (id) => {
  users = users.filter((user) => Number(user.id) !== Number(id));
};

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  clearUsers: () => {
    users = [];
  },
};
