export const users = [];

let maxUserId = -1;

export function getAll() {
  return users;
}

export function getById(id) {
  return users.find((user) => user.id === id);
}

export function create(name) {
  const id = ++maxUserId;
  const user = { id, name };

  users.push(user);

  return user;
}

export function deleteById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

export function update({ id, name }) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}
