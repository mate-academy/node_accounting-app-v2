const users = [];
let nextUser = 1;

const getUsers = async (req, res) => {
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const user = users.find((cat) => cat.id === userId);

  if (!user || user === -1) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  return res.status(200).json(user);
};

const postUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'nome é obrigatorio',
    });
  }

  const newCategory = { id: nextUser++, name };

  users.push(newCategory);

  res.status(201).json(newCategory);
};

const patchUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const user = users.find((cat) => cat.id === userId);

  if (user === undefined) {
    return res.status(404).json({
      error: 'Item nao encontrado',
    });
  }

  if (!name) {
    return res.status(400).json({
      error: 'Nenhum campo para atualizar foi enviado',
    });
  }

  if (name !== undefined) {
    user.name = name;
  }

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  const user = users.findIndex((cat) => cat.id === userId);

  if (user === -1) {
    return res.status(404).json({
      error: 'Item nao encontrado',
    });
  }

  users.splice(user, 1);

  return res.status(204).send();
};

module.exports = {
  users,
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
};
