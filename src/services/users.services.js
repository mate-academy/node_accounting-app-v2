let users = [];

const getAll = () => {
  return users;
};

const getUser = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const user = {
    id: Date.now(),
    name: name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getUser(id);

  if (name !== undefined) {
    user.name = name;
  }

  return user;
};

const remove = (id) => {
  const filteredUsers = users.filter((user) => user.id !== id);

  users = filteredUsers;
};

function resetUser() {
  users = [];
}

module.exports = {
  getAll,
  getUser,
  create,
  update,
  remove,
  resetUser,
};
