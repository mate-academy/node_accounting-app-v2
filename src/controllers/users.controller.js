'use strict';

const usersService = require('../services/users.service');

// Controlador para listar todos os usuários
const getAll = (req, res) => {
  res.status(200).json(usersService.getAll());
};

// Controlador para buscar um usuário pelo ID
const getById = (req, res) => {
  const id = Number(req.params.id);
  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Controlador para criar um novo usuário
const create = (req, res) => {
  const { name } = req.body;

  // Validação: o nome é obrigatório
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = usersService.create(name);

  res.status(201).json(newUser);
};

// Controlador para atualizar os dados de um usuário
const update = (req, res) => {
  const id = Number(req.params.id);
  const user = usersService.update(id, req.body);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Controlador para remover um usuário
const remove = (req, res) => {
  const id = Number(req.params.id);
  const removed = usersService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
