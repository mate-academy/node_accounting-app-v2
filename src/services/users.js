let users = [{
  id: 1,
  name: 'John',
},
{
  id: 2,
  name: 'Mark',
}];

export function getAll() {
  return users;
}

export function findUserById(userId) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

export function addOne(name) {
  const maxID = Math.max(...users.map(user => user.id));
  const newUser = {
    id: maxID > 0 ? maxID + 1 : 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

export function updateOne(userId, name) {
  const foundUser = findUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

export function deleteOne(userId) {
  const filteredUsers = users.filter(user => user.id !== userId);

  users = filteredUsers;
}
