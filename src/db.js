'use strict';

// console.log('The value of path is:', process.env);

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '111',
  port: '5433',
});

client.connect();

client.query('SELECT * FROM test', async(err, res) => {
  console.log(err, res.rows);
  client.end();
});
