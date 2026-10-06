let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((u) => u.id === +id) || null;
};

const create = (name) => {
  const newUser = {
    name,
    id: Date.now(),
  };

  users.push(newUser);

  return newUser;
};

const upDate = ({ id, name }) => {
  const userUpdate = users.find((u) => u.id === +id);

  if (!userUpdate) {
    return null;
  }

  Object.assign(userUpdate, { name });

  return userUpdate;
};

const deleteById = (id) => {
  const index = users.findIndex((e) => e.id === +id);

  if (index === -1) {
    return null;
  }

  const user = users.splice(index, 1);

  return user;
};

const resetUser = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  resetUser,
};
