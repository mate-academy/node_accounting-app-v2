let users = [];
let lastId = 0;

function getAll(req, res) {
  res.send(users.sort((a, b) => a.id - b.id));
}

function getOne(req, res) {
  const id = req.params.id;
  const response = users.find((item) => item.id === +id);

  if (response) {
    res.send(response);

    return;
  }

  res.sendStatus(404);
}

function createUser(req, res) {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  lastId++;

  const user = {
    id: lastId,
    name,
  };

  users.push(user);

  res.statusCode = 201;
  res.send(user);
}

function deleteUser(req, res) {
  const id = req.params.id;

  const deletedUser = users.find((item) => item.id === +id);

  if (deletedUser) {
    users = users.filter((item) => item.id !== deletedUser.id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateOne(req, res) {
  const id = req.params.id;
  const data = req.body;

  let userToUpdate = users.find((item) => item.id === +id);
  const index = users.indexOf(userToUpdate);

  userToUpdate = { ...userToUpdate, ...data };
  users[index] = userToUpdate;

  res.send(userToUpdate);
}

module.exports = {
  getAll,
  createUser,
  deleteUser,
  updateOne,
  getOne,
  users,
};
