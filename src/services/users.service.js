let users = [];

const getAll = () => {
  return users;
};

const get = (id) => {
  return users.find((item) => item.id === id) || null;
};

const add = (name) => {
  const id = users.length;
  const user = { id, name };

  users.push(user);

  return user;
};

const remove = (id) => {
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [removed] = users.splice(index, 1);

  return removed;
};

const update = (id, body) => {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, body);
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
  reset,
};
