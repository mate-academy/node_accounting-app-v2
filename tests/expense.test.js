'use strict';

const supertest = require('supertest');
const { createServer } = require('../src/createServer');
const store = require('../src/data/store');

describe('Expense', () => {
  let server;
  let api;

  beforeEach(() => {
    store.reset();
    server = createServer();
    api = supertest(server);
  });

  describe('createExpense', () => {
    it('should create a new expense', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...expenseData,
        }),
      );
    });

    it('should use a separate expense id sequence', async () => {
      await api.post('/users').send({ name: 'John Doe' });

      const {
        body: { id: userId },
      } = await api.post('/users').send({ name: 'Jane Doe' });

      const response = await api.post('/expenses').send({
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      });

      expect(response.body.id).toBe(1);
    });

    it('should return 400 if name is not provided', async () => {
      await api.post('/expenses').send({}).expect(400);
    });

    it('should return 400 if user not found', async () => {
      const expenseData = {
        userId: 1,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      await api.post('/expenses').send(expenseData).expect(400);
    });

    it('should return 400 if required fields are missing', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
        name: 'John Doe',
      });

      const response = await api.post('/expenses').send({
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        amount: 999,
        category: 'Electronics',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
      });
    });
  });

  describe('getExpenses', () => {
    it('should return empty array if no expenses', async () => {
      const response = await api
        .get('/expenses')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual([]);
    });

    it('should return all expenses', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      const response = await api
        .get('/expenses')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual([
        {
          id: expenseId,
          ...expenseData,
        },
      ]);
    });

    it('should return all expenses for a user', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
        name: 'John Doe',
      });

      const {
        body: { id: userId2 },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      await api.post('/expenses').send({
        ...expenseData,
        userId: userId2,
      });

      const response = await api
        .get(`/expenses?userId=${userId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual([
        {
          id: expenseId,
          ...expenseData,
        },
      ]);
    });

    it('should return all expenses between dates', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      await api.post('/expenses').send({
        ...expenseData,
        spentAt: '2022-10-20T11:01:43.462Z',
      });

      const response = await api
        // eslint-disable-next-line max-len
        .get(
          `/expenses?&from=2022-10-19T00:00:00.000Z&to=2022-10-19T23:59:59.999Z`,
        )
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual([
        {
          id: expenseId,
          ...expenseData,
        },
      ]);
    });

    it('should return all expenses by category', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      await api.post('/expenses').send({
        ...expenseData,
        category: 'Food',
      });

      const response = await api
        .get(`/expenses?userId=${userId}&categories=Electronics`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual([
        {
          id: expenseId,
          ...expenseData,
        },
      ]);
    });
  });

  describe('getExpense', () => {
    it('should return expense', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      const response = await api
        .get(`/expenses/${expenseId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        id: expenseId,
        ...expenseData,
      });
    });

    it('should return 404 if expense not found', async () => {
      await api.get('/expenses/1').expect(404);
    });
  });

  describe('updateExpense', () => {
    it('should update expense', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      const response = await api
        .patch(`/expenses/${expenseId}`)
        .send({
          title: 'Buy a new TV',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        id: expenseId,
        ...expenseData,
        title: 'Buy a new TV',
      });

      const getResponse = await api
        .get(`/expenses/${expenseId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(getResponse.body).toEqual({
        id: expenseId,
        ...expenseData,
        title: 'Buy a new TV',
      });
    });

    it('should return 404 if expense not found', async () => {
      const response = await api.patch('/expenses/1').send({ title: 'TV' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Not found',
      });
    });

    it('should return 400 if title is not provided', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
        name: 'John Doe',
      });

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send({
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      });

      const response = await api.patch(`/expenses/${expenseId}`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
      });
    });
  });

  describe('deleteExpense', () => {
    it('should delete expense', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
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

      const {
        body: { id: expenseId },
      } = await api.post('/expenses').send(expenseData);

      const response = await api.delete(`/expenses/${expenseId}`).expect(204);

      expect(response.text).toBe('');

      await api.get(`/expenses/${expenseId}`).expect(404);
    });

    it('should clear exported expenses after delete and reset', async () => {
      const {
        body: { id: userId },
      } = await api.post('/users').send({
        name: 'John Doe',
      });

      await api.post('/expenses').send({
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      });

      const {
        body: { id: secondExpenseId },
      } = await api.post('/expenses').send({
        userId,
        spentAt: '2022-10-20T11:01:43.462Z',
        title: 'Buy a new TV',
        amount: 499,
        category: 'Electronics',
        note: 'I need a new TV',
      });

      await api.delete('/expenses/1').expect(204);

      store.reset();

      expect(store.expenses).toEqual([]);
      await api.get(`/expenses/${secondExpenseId}`).expect(404);
    });

    it('should return 404 if expense not found', async () => {
      const response = await api.delete('/expenses/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Not found',
      });
    });
  });
});
