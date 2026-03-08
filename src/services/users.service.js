let usersDb = [];
let nextId = 1;

const resetUsers = () => {
  usersDb = [];
  nextId = 1;
};

const getAllUsers = () => {
  return usersDb;
};

const getUser = (id) => {
  return usersDb.find((user) => user.id === id);
};

const createUserPost = (data) => {
  const user = { ...data, id: nextId++ };

  usersDb.push(user);

  return user;
};

const updateUser = (id, data) => {
  const user = getUser(id);

  if (!user) {
    return null;
  }

  Object.assign(user, data);

  return user;
};

const deleteUser = (id) => {
  const index = usersDb.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  usersDb.splice(index, 1);

  return true;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUser,
  createUserPost,
  updateUser,
  deleteUser,
};
