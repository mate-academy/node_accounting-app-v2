let users = [];
let currentId = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const newUser = { id: currentId++, name };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const user = getById(+id);

  if (user) {
    user.name = name;
  }

  return user;
};

const clearAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearAll,
};
