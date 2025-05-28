const { v4: uuidv4 } = require('uuid');

const users = [];
const clearUsers = () => {
  users.length = 0;
};

const getAllUsers = () => users;

const getUser = (id) => users.find((user) => user.id === +id);

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index !== -1) {
    const [user] = users.splice(index, 1);

    return user;
  }
};

const createUser = (username) => {
  const user = {
    name: username,
    id: Number(uuidv4().replace(/[a-zA-Z]|-/g, '')),
  };

  users.push(user);

  return user;
};

const updateUser = (id, { name }) => {
  const user = getUser(+id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
