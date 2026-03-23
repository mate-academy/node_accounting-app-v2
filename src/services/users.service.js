'use strict';

// Array em memória para armazenar os usuários
// Variável para gerar IDs sequenciais automaticamente
let users = [];
let idCounter = 0;

// Reinicia o estado (usado nos testes para isolar cada cenário)
function reset() {
  users = [];
  idCounter = 0;
}

// Retorna todos os usuários cadastrados
function getAll() {
  return users;
}

// Busca um usuário específico pelo seu ID
function getById(id) {
  return users.find((user) => user.id === id) || null;
}

// Cria um novo usuário e o adiciona ao array
function create(name) {
  const newUser = {
    id: ++idCounter,
    name,
  };

  users.push(newUser);

  return newUser;
}

// Atualiza os dados de um usuário existente
function update(id, data) {
  const user = getById(id);

  if (!user) {
    return null;
  }

  // Mescla os novos dados no objeto do usuário existente
  Object.assign(user, data);

  return user;
}

// Remove um usuário pelo ID
function remove(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

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
