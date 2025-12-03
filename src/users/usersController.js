const getUsers = (req, res) => {
  const users = req.app.locals.users;

  res.json(users);
};

const getUsersById = (req, res) => {
  const users = req.app.locals.users;
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const postUsers = (req, res) => {
  const users = req.app.locals.users;
  const counter = req.app.locals.userIdCounter++;

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing parameter' });
  }

  const user = { id: counter, name };

  users.push(user);

  res.status(201).json(user);
};

const putUsersById = (req, res) => {
  const users = req.app.locals.users;
  const id = parseInt(req.params.id);

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing parameter' });
  }

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index] = { ...users[index], name };
  res.json(users[index]);
};

const patchUsersById = (req, res) => {
  const users = req.app.locals.users;
  const id = parseInt(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
};

const deleteUsersById = (req, res) => {
  const users = req.app.locals.users;
  const id = parseInt(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  putUsersById,
  patchUsersById,
  deleteUsersById,
};
