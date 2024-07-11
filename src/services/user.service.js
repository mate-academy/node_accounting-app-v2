let users = [];

function resetAllUsers() {
  users = [];
}

const getAllUsers = () => users;

const getUserById = (id) =>
  users.find((user) => Number(user.id) === Number(id));

const addUser = (name) => {
  const newUser = {
    id: Math.round(Math.random() * 200),
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter((user) => Number(user.id) !== Number(id));
};

const updateUser = (id, name) => {
  const user = users.find((item) => Number(item.id) === Number(id));

  if (!user) {
    return;
  }
  user.name = name;

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  resetAllUsers,
};
