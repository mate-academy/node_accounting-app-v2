import { CommonDatabase, Database } from '../utils/types/database';
import { Expense } from '../utils/types/ExpenseType';
import { User } from '../utils/types/UserType';
import { QueryType } from '../utils/types/QueryType';
import getExpenseByQuery from '../helpers/getExpenseByQuery';
import { v4 as uuidv4 } from 'uuid';

const commonDatabase: CommonDatabase = {
  users: [],
  expenses: [],
};

const {users, expenses} = commonDatabase;

  export function getAll (
    db: Database,
    query: Partial<QueryType> = {},
  ) {
    const isQueryEmpty = Object.keys(query).length === 0;
    if(!isQueryEmpty && db === 'expenses') {
      return getExpenseByQuery(expenses, query);
    }
    return commonDatabase[db];
  };

  export function create (db: Database, item: Partial<User> | Partial<Expense>) {
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
        expenses.push({
          id: uuidv4(),
          ...item
        } as Expense);
        return item;

      default:
        return;
    }
  };

  export function getById (db: Database, idToFind: string) {
    const dbToSearch = commonDatabase[db] as (User | Expense)[];

    return dbToSearch.find(({id}) => id === idToFind || null)
  };

  export function remove (db: Database, idToFind: string) {
    const dbToSearch = commonDatabase[db] as (User | Expense)[];
    const elementIndex = dbToSearch.findIndex(({id}) => id === idToFind);

    commonDatabase[db].splice(elementIndex, 1);
  };

  export function patch (db: Database, idToFind: string, data: Partial<User> | Partial<Expense>) {
    const dbToSearch = commonDatabase[db];
    const elementIndex = dbToSearch.findIndex(({id}) => id === idToFind);

    Object.assign(
      dbToSearch[elementIndex],
      {...dbToSearch[elementIndex], ...data},
    )

    return dbToSearch[elementIndex];
  };
