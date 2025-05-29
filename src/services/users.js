let users = [];
let nextUserId = 1;

const getAll = () => users;
const addUser = (name) => {
  const user = {
    name,
    id: nextUserId++,
  };

  users.push(user);

  return user;
};
const getById = (userId) => users.find((user) => user.id === +userId);
const deleteUser = (userId) => {
  users = users.filter((user) => user.id !== +userId);
};
const updateUser = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const userExists = (userId) => users.map((user) => user.id).includes(+userId);
const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  addUser,
  getById,
  deleteUser,
  updateUser,
  userExists,
  clear,
};
