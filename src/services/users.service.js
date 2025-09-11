let users = [];
let nextId = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === parseInt(id)) || null;
};

const add = (user) => {
  const createdUser = Object.assign({}, user, { id: nextId++ });

  users.push(createdUser);

  return createdUser;
};

const remove = (id) => {
  const existing = getById(id);

  if (!existing) {
    return;
  }
  users = users.filter((user) => user.id !== parseInt(id));
};

const update = (newUser) => {
  const user = getById(newUser.id);

  if (!user) {
    return;
  }

  return Object.assign(user, newUser);
};

const clear = () => {
  users = [];
  nextId = 1;
};

const usersService = {
  getAll,
  getById,
  add,
  remove,
  update,
  clear,
};

module.exports = {
  usersService,
};
