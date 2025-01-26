const users = [];

const getUsers = () => {
  return users;
};

const getUser = (userId) => {
  const user = users.find((u) => u.id === userId);

  return user;
};

const addUser = (user) => {
  const newUser = {
    id: users.length + 1,
    ...user,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = (userId, newName) => {
  const user = users.find((u) => u.id === Number(userId));

  if (!user) {
    return;
  }

  user.name = newName;

  return user;
};

const removeUser = (index) => {
  users.splice(index, 1);
};

const resetUsers = () => {
  users.length = 0;
};

module.exports = {
  resetUsers,
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
};
