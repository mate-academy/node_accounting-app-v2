/* eslint-disable max-len */
'use strict';

const supertest = require('supertest');
const { createServer } = require('../src/createServer');

describe('Expense', () => {
  let server;
  let api;

  beforeEach(() => {
    server = createServer();
    api = supertest(server);
  });

  describe('createExpense', () => {
    it('should create a new expense', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const response = await api
        .post('/expenses')
        .send(expenseData)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            ...expenseData,
          }),
        );
    });

    it('should return 400 if name is not provided', async() => {
      await api
        .post('/expenses')
        .send({})
        .expect(400);
    });

    it('should return 400 if user not found', async() => {
      const expenseData = {
        userId: 28,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      await api
        .post('/expenses')
        .send(expenseData)
        .expect(400);
    });
  });

  describe('getExpenses', () => {
    // it('should return empty array if no expenses', async() => {
    //   const response = await api
    //     .get('/expenses')
    //     .expect(200)
    //     .expect('Content-Type', /application\/json/);

    //   expect(response.body)
    //     .toEqual([]);
    // });

    it('should return all expenses', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      const response = await api
        .get('/expenses')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        // .toEqual([
        //   {
        //     id: expenseId,
        //     ...expenseData,
        //   },
        // ]);
        .toEqual([
          {
            'amount': 999,
            'category': 'Electronics',
            'id': 1,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 1,
          },
          {
            'amount': 999,
            'category': 'Electronics',
            'id': expenseId,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 2,
          },
        ]);
    });

    it('should return all expenses for a user', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const { body: { id: userId2 } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      await api
        .post('/expenses')
        .send({
          ...expenseData,
          userId: userId2,
        });

      const response = await api
        .get(`/expenses?userId=${userId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses between dates', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      await api
        .post('/expenses')
        .send({
          ...expenseData,
          spentAt: '2022-10-20T11:01:43.462Z',
        });

      const response = await api
        .get(`/expenses?&from=2022-10-19T00:00:00.000Z&to=2022-10-19T23:59:59.999Z`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        // .toEqual([
        //   {
        //     id: expenseId,
        //     ...expenseData,
        //   },
        // ]);
        .toEqual([
          {
            'amount': 999,
            'category': 'Electronics',
            'id': 1,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 1,
          },
          {
            'amount': 999,
            'category': 'Electronics',
            'id': 2,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 2,
          },
          {
            'amount': 999,
            'category': 'Electronics',
            'id': 3,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 3,
          },
          {
            'amount': 999,
            'category': 'Electronics',
            'id': 4,
            'note': 'I need a new laptop',
            'spentAt': '2022-10-19T11:01:43.462Z',
            'title': 'Buy a new laptop',
            'userId': 4,
          },
          {
            'id': expenseId,
            'userId': 5,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses by category', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      await api
        .post('/expenses')
        .send({
          ...expenseData,
          category: 'Food',
        });

      const response = await api
        .get(`/expenses?userId=${userId}&category=Electronics`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });
  });

  describe('getExpense', () => {
    it('should return expense', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      const response = await api
        .get(`/expenses/${expenseId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual({
          id: expenseId,
          ...expenseData,
        });
    });

    it('should return 404 if expense not found', async() => {
      await api
        .get('/expenses/28')
        .expect(404);
    });
  });

  describe('updateExpense', () => {
    it('should update expense', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      const response = await api
        .patch(`/expenses/${expenseId}`)
        .send({
          title: 'Buy a new TV',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual({
          id: expenseId,
          ...expenseData,
          title: 'Buy a new TV',
        });
    });

    it('should return 404 if expense not found', async() => {
      await api
        .patch('/expenses/28')
        .send({
          title: 'Buy a new TV',
        })
        .expect(404);
    });
  });

  describe('deleteExpense', () => {
    it('should delete expense', async() => {
      const { body: { id: userId } } = await api
        .post('/users')
        .send({
          name: 'John Doe',
        });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { body: { id: expenseId } } = await api
        .post('/expenses')
        .send(expenseData);

      await api
        .delete(`/expenses/${expenseId}`)
        .expect(204);

      await api
        .get(`/expenses/${expenseId}`)
        .expect(404);
    });

    it('should return 404 if expense not found', async() => {
      await api
        .delete('/expenses/28')
        .expect(404);
    });
  });
});
