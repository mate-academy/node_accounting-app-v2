let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const create = (name) => {
  const newUser = {
    id: Date.now(),
    name: name,
  };

  users.push(newUser);

  return newUser;
};

const get = (id) => {
  return users.find((user) => user.id === id);
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const userToUdpate = get(id);

  return Object.assign(userToUdpate, { name });
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
  clearUsers,
};
