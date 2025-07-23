// model
// resourses
let users = [];
let userIdCounter = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id) || null;
};

const create = (name) => {
  const newUser = {
    id: userIdCounter++,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const reset = () => {
  users = [];
  userIdCounter = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
