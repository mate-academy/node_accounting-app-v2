'use strict';

const getTypeOfDatabaseItem = require('../helpers/getTypeOfDatabaseItem');

const testExpense = {
  id: '3fasdfa2324',
  userId: 'fdasf543dfs',
  spentAt: '2023-04-02T11:46:08.681Z',
  title: 'some title',
  amount: 100,
  category: 'some category',
  note: 'some note',
};

const testUser = {
  id: 'fasjj5645j',
  name: 'john Doe',
};

const failTest = {
  notId: 2413423,
  notName: 43242,
  inValidObject: true,
};

test('Returns {type: User, isValid: true}', () => {
  expect(getTypeOfDatabaseItem(testUser)).toEqual({
    type: 'User', isValid: true,
  });
});

test('Returns {type: Expense, isValid: true}', () => {
  expect(getTypeOfDatabaseItem(testExpense)).toEqual({
    type: 'Expense', isValid: true,
  });
});

test('Returns {type: object, isValid: false}', () => {
  expect(getTypeOfDatabaseItem(failTest)).toEqual({
    type: 'object', isValid: false,
  });
});

test('Returns {type: number, isValid: false}', () => {
  expect(getTypeOfDatabaseItem(123124)).toEqual({
    type: 'number', isValid: false,
  });
});
