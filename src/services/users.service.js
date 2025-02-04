const users = [];

const getAll = () => users;

const generateId = (arr) => arr.length + 1;

const resetUsers = () => (users.length = 0);

const removeUser = (index) => users.splice(index, 1);

const create = (data) => {
  const newUser = { ...data, id: generateId(users) };

  users.push(newUser);

  return newUser;
};
const getById = (id) => users.find((user) => user.id === +id);

const exist = (userId) => users.some((user) => user.id === userId);

const indexOfUser = (id) => users.findIndex((user) => user.id === +id);

const update = (index, data) => {
  const user = users[index];

  const updatedUser = Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key];

    return acc;
  }, {});

  users[index] = { ...user, ...updatedUser };

  return users[index];
};

module.exports = {
  resetUsers,
  getAll,
  create,
  indexOfUser,
  update,
  getById,
  removeUser,
  exist,
};
