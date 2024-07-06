let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id) || null;
};

const generateUniqueId = () => {
  let id;

  do {
    id = Math.floor(Math.random() * 1000000);
  } while (users.some((user) => user.id === id));

  return id;
};

const create = (name) => {
  const user = {
    id: generateUniqueId(),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  const newUsers = users.filter((item) => item.id !== id);
  const success = newUsers.length !== users.length;

  if (success) {
    users = newUsers;
  }

  return success;
};

const update = (id, updates) => {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return null;
  }
  Object.assign(user, updates);

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
