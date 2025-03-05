let users = [];

const getAllUsers = () => users;

const getId = () =>
  users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

const getOne = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const create = (name) => {
  const user = {
    id: getId(),
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateUser = ({ id, name }) => {
  const user = getOne(+id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getOne,
  create,
  deleteUser,
  updateUser,
  resetUsers,
};
