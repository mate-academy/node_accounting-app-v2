'use strict';

import { CommonDatabase, Database } from '../utils/types/database';
import { Expense } from '../utils/types/ExpenseType';
import { User } from '../utils/types/UserType';
import { QueryType } from '../utils/types/QueryType';

const {v4: uuidv4} = require('uuid');
const getExpenseByQuery = require('../helpers/getExpenseByQuery');

const commonDatabase: CommonDatabase = {
  users: [],
  expenses: [],
};

const {users, expenses} = commonDatabase;

module.exports = {
  getAll: (
    db: Database,
    query: Partial<QueryType> = {},
  ) => {
    if(query && db === 'expenses') {
      return getExpenseByQuery(commonDatabase.expenses, query);
    }
    return commonDatabase[db];
  },

  create: (db: Database, item: Partial<User> | Expense) => {
    switch(db) {
      case 'users':
        const { name } = item as Partial<User>;
        if(name) {
          users.push({
            id: uuidv4(),
            name,
          });
        }
        return item;

      case 'expenses':
        expenses.push(item as Expense);
        return item;

      default: return;
    }
  },

  getById: (db: Database, id: string) => {
    const dbToSearch = commonDatabase[db] as (User | Expense)[];
    return dbToSearch.find((item) => item.id === id)
  },

  remove: (db: Database, id: string) => {
    const dbToSearch = commonDatabase[db] as (User | Expense)[];
    const elementIndex = dbToSearch.findIndex(item => item.id === id);

    commonDatabase[db].splice(elementIndex, 1);
  },

  patch: (db: Database, id: string, data: Partial<User> | Partial<Expense>) => {
    const dbToSearch = commonDatabase[db];
    const elementIndexToPatch = dbToSearch.findIndex(element => element.id === id);
    Object.assign(
      dbToSearch[elementIndexToPatch],
      {...dbToSearch[elementIndexToPatch], ...data},
    )

    return dbToSearch[elementIndexToPatch];
  }

}
