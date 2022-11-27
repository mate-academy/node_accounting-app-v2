export function create(
  name,
  users,
) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

export function getID(users, id) {
  const findUser = users.find((user) => user.id === +id);

  return findUser;
}

export function remove(users, id) {
  return users.filter((user) => user.id !== +id);
}

export function update(foundUser, name) {
  Object.assign(foundUser, name);

  return foundUser;
}
