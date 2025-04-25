const randomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

const users = [
  // {
  //   id: 0,
  //   name: 'Thomas',
  // },
  // {
  //   id: 1,
  //   name: 'Fred',
  // },
  // {
  //   id: 2,
  //   name: 'Ali-baba',
  // },
  // {
  //   id: 3,
  //   name: 'Muhammad',
  // },
];

const getAll = () => {
  return users;
};

const create = (name) => {
  const newUser = { id: randomId(), name };

  users.push(newUser);

  return newUser;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return index;
  }

  users.splice(index, 1);

  return true;
};

const update = (name, id) => {
  const targetUser = users.find((user) => user.id === id);

  if (!targetUser) {
    return false;
  }

  return Object.assign(targetUser, { name });
};

const resetUsers = () => {
  users.splice(0, users.length);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  users,
  randomId,
  resetUsers,
};
