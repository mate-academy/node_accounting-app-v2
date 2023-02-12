let users = [];

export function getAll() {
  return users;
}

export function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

export function getById(id) {
  const foundUser = users.find((user) => user.id === id);

  return foundUser || null;
}

export function removeById(id) {
  users = users.filter((user) => user.id !== id);
}

export function update({ id, name }) {
  const foundUser = getById(id);

  Object.assign(foundUser, { name });

  return foundUser;
}
