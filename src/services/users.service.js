const users = [];

let nextUserId = 1;

function getAllUsers() {
  return users;
}

function getUser(userId) {
  const user = users.find((u) => u.id === +userId);

  return user;
}

function addUser(name) {
  const user = {
    id: nextUserId++,
    name,
  };

  users.push(user);

  return user;
}

function removeUser(userId) {
  const indexOfUser = users.findIndex((u) => u.id === +userId);

  if (indexOfUser !== -1) {
    users.splice(indexOfUser, 1);

    return true;
  } else {
    return false;
  }
}

function changeUser(userId, body) {
  const indexOfUser = users.findIndex((u) => u.id === +userId);

  if (indexOfUser !== -1 || Object.keys(body).length !== 0) {
    users[indexOfUser] = { ...users[indexOfUser], ...body };

    return users[indexOfUser];
  }

  return -1;
}

module.exports = {
  users,
  getAllUsers,
  getUser,
  addUser,
  removeUser,
  changeUser,
};
