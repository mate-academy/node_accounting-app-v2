'use strict';

const express = require('express');
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'millionnow',
  database: 'postgres',
});

if (process.env.NODE_ENV === 'test') {
  beforeAll(async () => {
    await client.connect();
  });

  beforeEach(async () => {
    await client.query('DELETE FROM expenses;');
    await client.query('DELETE FROM users;');
    await client.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await client.query('ALTER SEQUENCE expenses_id_seq RESTART WITH 1;');
  });

  afterAll(async () => {
    await client.end();
  });
} else {
  client.connect();
}

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    try {
      const users = await client.query('SELECT id, name from users');

      res.status(200).json(users.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const result = await client.query(
        'INSERT INTO users (name) VALUES ($1) RETURNING id, name',
        [name],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    try {
      const result = await client.query(
        'SELECT id, name FROM users WHERE id=$1',
        [userId],
      );

      if (!result.rows[0]) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    try {
      const result = await client.query('DELETE FROM users WHERE id=$1', [
        userId,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const result = await client.query(
        'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name',
        [name, userId],
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    let sql = 'SELECT * FROM expenses';
    const params = [];
    const conditions = [];

    if (userId) {
      params.push(userId);
      conditions.push(`"userId" = $${params.length}`);
    }

    if (from) {
      params.push(from);
      conditions.push(`"spentAt" >= $${params.length}`);
    }

    if (to) {
      params.push(to);
      conditions.push(`"spentAt" <= $${params.length}`);
    }

    if (categories) {
      const cats = categories.split(',').map((c) => c.trim());

      params.push(cats);
      conditions.push(`category = ANY($${params.length})`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    try {
      const result = await client.query(sql, params);

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount } = req.body;
    const category = req.body.category || null;
    const note = req.body.note || null;

    const userIm = await client.query('SELECT * from users WHERE id = $1', [
      userId,
    ]);

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !userIm.rows[0]
    ) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const result = await client.query(
        'INSERT into expenses ("userId", "spentAt", title, ' +
          'amount, category, note) VALUES ' +
          '($1, $2, $3, $4, $5, $6) RETURNING id, title, "userId",' +
          ' "spentAt", amount, category, note',
        [userId, spentAt, title, amount, category, note],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;

    if (!expenseId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    try {
      const result = await client.query('SELECT * FROM expenses WHERE id=$1', [
        expenseId,
      ]);

      if (!result.rows[0]) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;
    const allowedFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];
    const updates = [];
    const values = [];

    // Gather only provided, allowed fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = $${updates.length + 1}`);
        values.push(req.body[field]);
      }
    });

    if (updates.length === 0) {
      return res.status(404).json({ error: 'No valid fields to update' });
    }

    // Add expenseId as last param
    values.push(expenseId);

    const sql = `UPDATE expenses SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;

    try {
      const result = await client.query(sql, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;

    if (!expenseId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    try {
      const result = await client.query('DELETE FROM expenses WHERE id=$1', [
        expenseId,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return app;
}

module.exports = {
  createServer,
};
