let users = [];

function getAll() {
  return users;
}

function get(userId) {
  return users.find((user) => user.id === userId);
}

function create(name) {
  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteById(userId) {
  const index = users.findIndex((us) => us.id === userId);

  if (index === -1) {
    return;
  }

  return users.splice(index, 1);
}

function update({ id, name }) {
  const thisUser = users.find((user) => user.id === id);

  if (!thisUser) {
    return;
  }

  Object.assign(thisUser, { name });

  return thisUser;
}

const resetUsers = () => {
  users = [];
};

const usersService = {
  getAll,
  get,
  create,
  deleteById,
  update,
  resetUsers,
};

module.exports = { usersService };
