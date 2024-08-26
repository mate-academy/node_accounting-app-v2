const getId = () => {
  return Math.floor(Math.random() * 1000);
};

const users = [
  {
    id: 1,
    name: 'mirek',
  },
];

const resetUsers = () => {
  users.splice(0, users.length);
};

const getUsers = () => {
  return users;
};

const getOneUser = (id) => {
  const selectedUser = users.find((user) => user.id === id);

  return selectedUser;
};

const createUser = (name) => {
  const newUser = {
    id: getId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);

    return true;
  }

  return false;
};

const updateUser = ({ id, name }) => {
  const selectedUser = getOneUser(+id);

  Object.assign(selectedUser, { name });

  return selectedUser;
};

module.exports = {
  resetUsers,
  createUser,
  getOneUser,
  getUsers,
  removeUser,
  updateUser,
};
