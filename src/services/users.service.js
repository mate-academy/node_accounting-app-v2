let allUsers = [];

const reset = () => {
  allUsers = [];
};

const getAll = () => {
  return allUsers;
};

const getOne = (id) => {
  return allUsers.find((person) => person.id === Number(id));
};

const createUser = (data) => {
  const newUser = {
    id: allUsers.length,
    ...data,
  };

  allUsers.push(newUser);

  return newUser;
};

const updateUser = (id, data) => {
  const user = getOne(id);

  Object.assign(user, data);

  return user;
};

const removeUser = (id) => {
  allUsers = allUsers.filter((person) => person.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
