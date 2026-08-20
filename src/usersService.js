function getAll(users) {
  return users;
}

function create(title, users) {
  const user = { id: Date.now(), title, completed: false };

  users.push(user);

  return user;
}

function getUserById(userId, users) {
  const user = users.find((el) => +el.id === +userId);

  return user;
}

function deleteUserById(userId, data) {
  const index = data.findIndex((todo) => +todo.id === +userId);

  if (index === -1) {
    return;
  }

  const item = data.splice(index, 1);

  if (!item) {
    return;
  }

  return item;
}

function patchItem(userId, name, data) {
  const itemIndex = data.findIndex((el) => +el.id === +userId);

  if (itemIndex === -1) {
    return;
  }

  data[itemIndex].name = name;

  return {
    id: String(userId),
    name,
  };
}

function addOneUser(name, users) {
  const user = { id: Date.now(), name };

  users.push(user);

  return user;
}

function deleteById(id, users) {
  const index = users.findIndex((el) => +el.id === +id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

const usersService = {
  getAll,
  getUserById,
  create,
  addOneUser,
  patchItem,
  deleteById,
};

module.exports = {
  ...usersService,
  deleteUserById,
};
