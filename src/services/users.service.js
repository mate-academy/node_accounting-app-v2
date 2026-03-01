const users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const user = { id: Date.now(), name };

  users.push(user);

  return user;
};

const deleteById = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return;
  }

  const [deletedUser] = users.splice(index, 1);

  return deletedUser;
};

const update = ({ id, name }) => {
  const userToUpdate = users.find((user) => user.id === id);

  if (!userToUpdate) {
    return userToUpdate;
  }

  return Object.assign(userToUpdate, { name });
};

const reset = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};
