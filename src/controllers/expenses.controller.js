'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

// Controlador para listar todas as despesas filtradas
const getAll = (req, res) => {
  const filtered = expensesService.getAll(req.query);

  res.status(200).json(filtered);
};

// Controlador para buscar uma despesa pelo ID
const getById = (req, res) => {
  const id = Number(req.params.id);
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

// Controlador para criar uma nova despesa
const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  // Validação: todos os campos são obrigatórios
  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Verifica se o usuário que está criando a despesa existe
  const userExists = usersService.getById(userId);

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

// Controlador para atualizar uma despesa existente
const update = (req, res) => {
  const id = Number(req.params.id);
  const expense = expensesService.update(id, req.body);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

// Controlador para remover uma despesa
const remove = (req, res) => {
  const id = Number(req.params.id);
  const removed = expensesService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'Expense not found' });
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
