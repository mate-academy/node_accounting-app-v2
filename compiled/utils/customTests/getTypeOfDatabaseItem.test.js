import getTypeOfDatabaseItem from '../helpers/getTypeOfDatabaseItem';
const testExpense = {
    userId: 'fdasf543dfs',
    spentAt: '2023-04-02T11:46:08.681Z',
    title: 'some title',
    amount: 100,
    category: 'some category',
    note: 'some note',
};
const testUser = {
    name: 'john Doe',
};
const failTest = {
    notId: 2413423,
    notName: 43242,
    inValidObject: true,
};
test('Returns {type: User, isValid: true}', () => {
    expect(getTypeOfDatabaseItem(testUser)).toEqual({
        type: 'User', correctDb: 'users', isValid: true,
    });
});
test('Returns {type: Expense, isValid: true}', () => {
    expect(getTypeOfDatabaseItem(testExpense)).toEqual({
        type: 'Expense', correctDb: 'expenses', isValid: true,
    });
});
test('Returns {type: Unknown, isValid: false}', () => {
    expect(getTypeOfDatabaseItem(failTest)).toEqual({
        type: 'Unknown', correctDb: 'none', isValid: false,
    });
});
test('Returns {type: Unknown, isValid: false}', () => {
    expect(getTypeOfDatabaseItem({ something: 1213421 })).toEqual({
        type: 'Unknown', correctDb: 'none', isValid: false,
    });
});
