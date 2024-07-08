let users = [];
let ids = 0;

const getAll = () => {
  return users;
};

const getUser = (id) => {
  const user = users.find((userId) => userId.id === +id) || null;

  return user;
};

const addNew = (newUserName) => {
  const newUser = {
    id: ids++,
    name: newUserName,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (id, newName) => {
  const updatingUser = getUser(id);

  if (updatingUser) {
    Object.assign(updatingUser, { name: newName });
  }

  return updatingUser;
};

const deleteUser = (deletingId) => {
  const user = getUser(deletingId);

  if (user) {
    users = users.filter((d) => d.id !== +deletingId);
  }

  return user;
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getUser,
  addNew,
  updateUser,
  deleteUser,
  reset,
};
