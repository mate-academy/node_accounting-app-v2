let userIdCounter = 1;
let users = [];

const setInitUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const create = (name) => {
  const user = { id: userIdCounter++, name };

  users.push(user);

  return user;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const deleteById = (id) => {
  const index = users.findIndex((person) => person.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
};

const update = (id, name) => {
  const userToUpdate = users.find((user) => user.id === id);

  if (!userToUpdate) {
    return;
  }

  return Object.assign(userToUpdate, { name });
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  update,
  setInitUsers,
};
