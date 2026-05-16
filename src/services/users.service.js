let users = [];

const initUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const create = (data) => {
  const { name } = data;

  let id = 1;

  while (users.some((u) => u.id === id)) {
    id++;
  }

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getById = (id) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return user;
};

const deleteById = (id) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  users = users.filter((u) => u.id !== id);

  return true;
};

const update = (id, data) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  Object.keys(data).forEach((key) => {
    if (Object.hasOwn(user, key) && data[key] !== undefined) {
      user[key] = data[key];
    }
  });

  return user;
};

module.exports = {
  initUsers,
  getAll,
  create,
  getById,
  deleteById,
  update,
};
