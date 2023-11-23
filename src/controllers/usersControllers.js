const {
  getAllUsers,
  getUserById,
  updateUser,
  addUser,
  deleteUser,
} = require('../services/usersServices');

const loadUsers = (req, res) => {
  res.send(getAllUsers)
};

const loadOneUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.statusCode(404);
    res.end('User not found');
    return;
  }

  res.send(user);
};

const addOneUser = (req, res) => {
  const { name }  = req.body;

  if (!name) {
    res.statusCode(404);
    res.end('Name is required');
    return;
  }

  
  try {
    const newUser = addUser(name);
    
    res.statusCode(201);

    res.send(newUser);
  } catch {
    res.statusCode(500);
    res.end('Error while adding');
    return;
  }
};

const changeOneUser = (req, res) => {
  const { personId } = req.params;
  const { name } = req.body;

  const user = getUserById(personId);
  
  if (!user) {
    res.statusCode(404);
    res.end('No such user');
    return;
  }

  if (typeof name !== 'string') {
    res.statusCode(422);
    res.end('Invalid request data');
    return;
  }

  const updatedUser = updateUser(personId, name);

  res.send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (getUserById(id)) {
    res.statusCode(404);
    res.end('User not found');
    return;
  }

  deleteUser(id);
    
  res.sendStatus(204);
};

module.exports = {
  loadUsers,
  loadOneUser,
  addOneUser,
  changeOneUser,
  removeUser,
};
