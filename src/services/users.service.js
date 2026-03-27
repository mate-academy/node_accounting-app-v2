let nextUserId = 1;

const getAll = (users) => {
  return users;
};

const getById = (users, id) => {
  return users.find((user) => user.id === id);
};

const create = (users, name) => {
  const id = nextUserId++;
  const user = {
    id,
    name,
  };

  users.push(user);

  return user;
};

const update = (user, name) => {
  Object.assign(user, { name });

  return user;
};

const remove = (users, id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
