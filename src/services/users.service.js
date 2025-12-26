const users = [];

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

const update = (id, { name }) => {
  const user = users.find((u) => u.id === id);

  return Object.assign(user, { name });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
