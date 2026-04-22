let users = [];
let currentUserId = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const user = { id: currentUserId, name };

  users.push(user);

  currentUserId++;

  return user;
};

const deleteById = (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
};

const update = ({ id, name }) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
};

const resetInitialValues = () => {
  users = [];
  currentUserId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  resetInitialValues,
};
