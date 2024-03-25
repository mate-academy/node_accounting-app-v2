const users = [
  { id: '1', name: 'Alex' },
  { id: '2', name: 'Bob' },
];

const getUsers = (req, res) => {
  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

module.exports = {
  getUsers,
  getOne,
};
