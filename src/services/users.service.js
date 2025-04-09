// let users = [
//   {
//     id: 0,
//     name: 'Harry Eblov',
//   },
//   {
//     id: 1,
//     name: 'Marry Popkins',
//   },
//   {
//     id: 2,
//     name: 'Svinomatka',
//   },
// ];

let users = [];

const getUsers = () => {
  return users;
};

const createUser = (name) => {
  const newUser = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUser = (id) => {
  return users.find((user) => user.id === id) || null;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateUser = (id, newName) => {
  const currentUser = getUser(id);

  currentUser.name = newName;

  return currentUser;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  clearUsers,
  updateUser,
};
