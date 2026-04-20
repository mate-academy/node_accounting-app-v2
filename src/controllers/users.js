'use strict';

const getUsers = (req, res, userData) => {
  const resultado = [...userData];

  res.status(200).json(resultado);
};

const getUserById = (req, res, userData) => {
  const user = userData.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'Not Found' });
  }

  res.status(200).json(user);
};

const createUser = (req, res, userData, getNextId) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Falta campos' });
  }

  const data = {
    id: getNextId(),
    name: req.body.name,
  };

  userData.push(data);
  res.status(201).json(data);
};

const updateUser = (req, res, userData) => {
  const user = userData.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'Not Found' });
  }

  Object.assign(user, req.body);
  res.status(200).json(user);
};

const deleteUser = (req, res, userData) => {
  const index = userData.findIndex(
    (u) => Number(u.id) === Number(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Not Found' });
  }

  userData.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
