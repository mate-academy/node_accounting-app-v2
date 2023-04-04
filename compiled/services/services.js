import getExpenseByQuery from '../utils/helpers/getExpenseByQuery';
import { v4 as uuidv4 } from 'uuid';
const commonDatabase = {
    users: [],
    expenses: [],
};
const { users, expenses } = commonDatabase;
export function getAll(db, query = {}) {
    const isQueryEmpty = Object.keys(query).length === 0;
    if (!isQueryEmpty && db === 'expenses') {
        return getExpenseByQuery(expenses, query);
    }
    return commonDatabase[db];
}
;
export function create(db, item) {
    switch (db) {
        case 'users':
            const { name } = item;
            const newUser = {
                id: uuidv4(),
                name,
            };
            if (name) {
                users.push(newUser);
            }
            return newUser;
        case 'expenses':
            const newExpense = Object.assign({ id: uuidv4() }, item);
            expenses.push(newExpense);
            return newExpense;
        default:
            return;
    }
}
;
export function getById(db, idToFind) {
    const dbToSearch = commonDatabase[db];
    return dbToSearch.find(({ id }) => id === idToFind || null);
}
;
export function remove(db, idToFind) {
    const dbToSearch = commonDatabase[db];
    const elementIndex = dbToSearch.findIndex(({ id }) => id === idToFind);
    commonDatabase[db].splice(elementIndex, 1);
}
;
export function patch(db, idToFind, data) {
    const dbToSearch = commonDatabase[db];
    const elementIndex = dbToSearch.findIndex(({ id }) => id === idToFind);
    Object.assign(dbToSearch[elementIndex], Object.assign(Object.assign({}, dbToSearch[elementIndex]), data));
    return dbToSearch[elementIndex];
}
;
