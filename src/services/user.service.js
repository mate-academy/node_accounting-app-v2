let users = [];
let nextId = 1;

const getAll = () => users;
const getById = (id) => users.find((user) => user.id === +id) || null;
const create = (name) => {
  const newUser = {
    name,
    id: nextId,
  };

  nextId += 1;

  users.push(newUser);

  return newUser;
};
const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};
const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const reset = () => {
  users = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
