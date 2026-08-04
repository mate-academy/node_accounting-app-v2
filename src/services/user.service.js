const users = [];

const getAll = () => {
  return [...users];
};

const getById = (id) => {
  return users.find((element) => element.id === id);
};

const create = (name) => {
  const id = Math.ceil(Math.random() * 999999999999);
  const user = { id, name };

  users.push(user);

  return user;
};

const update = (id, data) => {
  const user = getById(id);

  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, data);

  return user;
};

const remove = (id) => {
  const user = getById(id);

  if (!user) {
    throw new Error('User not found');
  }

  const index = users.findIndex((element) => element.id === id);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  users,
};
