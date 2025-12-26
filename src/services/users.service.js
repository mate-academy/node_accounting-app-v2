let users = [];

const initUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  const user = users.find((u) => u.id === id);

  return user;
};

const create = (name) => {
  let accessibleId;

  for (let i = 1; true; i++) {
    const idExist = users.some((u) => u.id === i);

    if (!idExist) {
      accessibleId = i;

      break;
    }
  }

  const newUser = {
    id: accessibleId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteById = (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1);
};

const update = (id, data) => {
  const user = users.find((u) => u.id === id);

  Object.keys(data).forEach((key) => {
    if (Object.hasOwn(user, key) && data[key] !== undefined) {
      user[key] = data[key];
    }
  });

  return user;
};

module.exports = {
  initUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
