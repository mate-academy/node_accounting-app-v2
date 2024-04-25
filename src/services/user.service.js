let users = [
  { id: 0, name: 'John' },
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Emily' },
  { id: 4, name: 'Michael' },
];

const getAll = () => users;

const getOne = (id) => {
  return users.find((user) => user.id === +id);
};

const create = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = (name, id) => {
  const ind = users.findIndex((user) => user.id === +id);
  const userToUpdate = { id: +id, name };

  users[ind] = userToUpdate;

  return userToUpdate;
};

module.exports = {
  users,
  getAll,
  getOne,
  create,
  remove,
  update,
};
