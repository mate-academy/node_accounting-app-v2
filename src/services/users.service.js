const users = [];
let currentId = 10;

const reset = () => {
  users.length = 0;
  currentId = 10;
};

const getAll = () => users;

const getById = (id) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  return users.find((user) => user.id === numId);
};

const create = (name) => {
  currentId += 1;

  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteById = (id) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  const userIndex = users.findIndex((u) => u.id === numId);

  if (userIndex === -1) {
    return;
  }

  const [user] = users.splice(userIndex, 1);

  return user;
};

const updateById = (id, { name }) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  const user = users.find((u) => u.id === numId);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  reset,
};
