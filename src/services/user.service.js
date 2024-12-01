let users = [];
let nextId = 1;

const resetUsers = () => {
  users = [];
  nextId = 1;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  const userId = Number(id);

  return users.find((person) => person.id === userId) || null;
};

const create = (name) => {
  const newUser = {
    id: nextId,
    name,
  };

  nextId++;

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  const filteredUsers = users.filter((person) => person.id !== id);

  users = filteredUsers;

  return users;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
  resetUsers,
};
