let users = [];

const getAllUsers = () => {
  return users;
};

const addUser = (user) => {
  users.push(user);
};

const findUser = (id) => {
  return users.find((item) => +item.id === +id);
};

const filteredUsers = (id) => {
  return users.filter((item) => +item.id !== +id);
};

const changeUsers = (newUsers) => {
  users = newUsers;
};

module.exports = {
  getAllUsers,
  addUser,
  findUser,
  filteredUsers,
  changeUsers,
};
