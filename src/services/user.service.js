let users = [];

function emptyUsers() {
  users = [];
}

function getAll() {
  return users;
}

function getById(id) {
  // console.log(`getById(${id}). users: `, users);

  const user = users.find((u) => u.id === id);

  // console.log('found user: ', user);

  return user;
}

function create(name) {
  const id = users.length + 1;

  // const user = new User(id, name);

  users.push({ id, name });

  return { id, name };
}

function deleteById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = getById(id);

  if (!user) {
    // console.log(`update - user not found. id = ${id}`, user);

    return;
  }

  return Object.assign(user, { name });
}

const userService = {
  emptyUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};

module.exports = userService;
