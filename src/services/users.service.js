let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id.toString() === id.toString()) || null;
};

const create = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  const newUsers = users.filter((user) => user.id.toString() !== id.toString());

  users = newUsers;
};

const update = (userById, name) => {
  Object.assign(userById, { name });
};

const resetDate = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetDate,
};
