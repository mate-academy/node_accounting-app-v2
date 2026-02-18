let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  const id = users.length ? users.at(-1).id + 1 : 0;

  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  if (newUsers.length === users.length) {
    return false;
  }

  users = newUsers;

  return true;
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return false;
  }

  user.name = name;

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteUser,
  update,
};
