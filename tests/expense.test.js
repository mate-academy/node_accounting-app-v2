'use strict';

const express = require('express'); // імпортуємо express

function createServer() {
   const server = express();

   // Створення масивів для збереження користувачів та витрат
   let users = [];
   let expenses = [];

   server.use(express.json()); // Для парсингу JSON в тілі запиту

   // Маршрут для створення користувача
   server.post('/users', (req, res) => {
      const { name } = req.body;
      if (!name) {
         return res.status(400).send('Name is required');
      }
      const newUser = { id: users.length + 1, name };
      users.push(newUser);
      res.status(201).json(newUser);
   });

   // Маршрут для отримання всіх користувачів
   server.get('/users', (req, res) => {
      res.status(200).json(users);
   });

   // Маршрут для створення витрати
   server.post('/expenses', (req, res) => {
      const { name, amount, userId } = req.body;

      // Перевірка, чи всі поля надані
      if (!name || !amount || !userId) {
         return res.status(400).send('Name, amount, and userId are required');
      }

      // Перевірка, чи amount є числом
      if (isNaN(amount)) {
         return res.status(400).send('Amount must be a number');
      }

      // Перевірка, чи існує користувач з таким userId
      const userExists = users.find(user => user.id === userId);
      if (!userExists) {
         return res.status(400).send('User not found');
      }

      const newExpense = { id: expenses.length + 1, name, amount, userId };
      expenses.push(newExpense);
      res.status(201).json(newExpense);
   });

   // Маршрут для отримання всіх витрат
   server.get('/expenses', (req, res) => {
      const { userId, from, to, categories } = req.query;

      let filteredExpenses = expenses;

      if (userId) {
         filteredExpenses = filteredExpenses.filter(expense => expense.userId == userId);
      }

      if (from && to) {
         filteredExpenses = filteredExpenses.filter(
            expense => expense.spentAt >= from && expense.spentAt <= to
         );
      }

      if (categories) {
         filteredExpenses = filteredExpenses.filter(
            expense => expense.category === categories
         );
      }

      res.status(200).json(filteredExpenses);
   });

   // Маршрут для отримання витрати за ID
   server.get('/expenses/:id', (req, res) => {
      const expense = expenses.find(e => e.id === parseInt(req.params.id));
      if (!expense) {
         return res.status(404).send('Expense not found');
      }
      res.status(200).json(expense);
   });

   // Маршрут для оновлення витрати
   server.patch('/expenses/:id', (req, res) => {
      const expense = expenses.find(e => e.id === parseInt(req.params.id));
      if (!expense) {
         return res.status(404).send('Expense not found');
      }
      const { name, amount, userId } = req.body;

      // Перевірка, чи amount є числом
      if (amount && isNaN(amount)) {
         return res.status(400).send('Amount must be a number');
      }

      // Перевірка, чи існує користувач з таким userId
      if (userId && !users.find(user => user.id === userId)) {
         return res.status(400).send('User not found');
      }

      expense.name = name || expense.name;
      expense.amount = amount || expense.amount;
      expense.userId = userId || expense.userId;

      res.status(200).json(expense);
   });

   // Маршрут для видалення витрати
   server.delete('/expenses/:id', (req, res) => {
      const index = expenses.findIndex(e => e.id === parseInt(req.params.id));
      if (index === -1) {
         return res.status(404).send('Expense not found');
      }
      expenses.splice(index, 1);
      res.status(204).send();
   });

   return server;
}

module.exports = {
   createServer,
};
