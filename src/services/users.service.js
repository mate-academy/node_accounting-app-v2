function createId() {
  return Math.round(Math.random() * 1000);
}

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === +id);
};

const create = (name) => {
  const user = {
    id: createId(),
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetUsers,
};
