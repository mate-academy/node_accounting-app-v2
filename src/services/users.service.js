const users = [];

const getAll = () => {
  return users;
};

const getOne = (id) => {
  return users.find((u) => u.id === +id);
};

const create = (name) => {
  const id = (users[users.length - 1]?.id || 0) + 1;
  const newUser = { name, id };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const updatedUser = { name, id: +id };
  const index = users.findIndex((u) => u.id === +id);

  users.splice(index, 1, updatedUser);

  return updatedUser;
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === +id);

  users.splice(index, 1);
};

const clearAll = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  clearAll,
};
