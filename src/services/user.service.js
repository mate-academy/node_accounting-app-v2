let users = [];

const getAll = () => users;

const getById = (id) => users.find((user) => user.id === id);

const create = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteById = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateById = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
