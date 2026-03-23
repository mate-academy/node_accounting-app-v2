'use strict';

// Array em memória para armazenar as despesas
// Contador para gerar IDs sequenciais para as despesas
let expenses = [];
let idCounter = 0;

// Reinicia o estado (usado nos testes para isolar cada cenário)
function reset() {
  expenses = [];
  idCounter = 0;
}

// Retorna todas as despesas, aplicando possíveis filtros (query params da API)
function getAll(filters = {}) {
  let filtered = [...expenses];

  // Filtra por usuário específico, se fornecido
  if (filters.userId) {
    filtered = filtered.filter((e) => e.userId === Number(filters.userId));
  }

  // Filtra despesas a partir de uma data inicial (from)
  if (filters.from) {
    const fromDate = new Date(filters.from);

    filtered = filtered.filter((e) => new Date(e.spentAt) >= fromDate);
  }

  // Filtra despesas até uma data final (to)
  if (filters.to) {
    const toDate = new Date(filters.to);

    filtered = filtered.filter((e) => new Date(e.spentAt) <= toDate);
  }

  // Filtra despesas por categorias específicas (separadas por vírgula)
  if (filters.categories) {
    const categoryList = filters.categories.split(',');

    filtered = filtered.filter((e) => categoryList.includes(e.category));
  }

  return filtered;
}

// Busca uma despesa específica pelo seu ID
function getById(id) {
  return expenses.find((expense) => expense.id === id) || null;
}

// Cria uma nova despesa
function create(data) {
  const newExpense = {
    id: ++idCounter,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

// Atualiza os dados de uma despesa existente (PATCH)
function update(id, data) {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  // Substitui as propriedades da despesa atual pelas novas fornecidas
  Object.assign(expense, data);

  return expense;
}

// Remove uma despesa baseada no ID recebido
function remove(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
