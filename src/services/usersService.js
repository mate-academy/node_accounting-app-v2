
import { v4 as uuidv4 } from 'uuid';

let users = [];

export function getUsers() {
  return users;
}

export function getUser(id) {
  const user = users.find((u) => u.id === +id);

  return user || null;
}

export function createUser(name = '') {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  return newUser;
}

export function removeUser(id) {
  const newUsers = users.filter((user) => user.id !== +id);

  users = newUsers;
}

export function updateUser(id, name) {
  const foundUser = getUser(id);

  Object.assign(foundUser, { name });

  return foundUser;
}
