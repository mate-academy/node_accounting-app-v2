let users = [];

const reset = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getOne = (id) => {
  return users.find((person) => person.id === Number(id));
};

const create = (data) => {
  const user = {
    id: users.length,
    ...data,
  };

  users.push(user);

  return user;
};

const update = (id, data) => {
  const user = getOne(id);

  Object.assign(user, data);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getOne,
  create,
  update,
  remove,
};
