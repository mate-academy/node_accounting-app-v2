let users = [];

const getAll = () => {
  return users;
};

const getOne = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (name) => {
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateUser = ({ id, name }) => {
  const user = getOne(+id);

  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  getOne,
  createUser,
  removeUser,
  updateUser,
  clear,
};
