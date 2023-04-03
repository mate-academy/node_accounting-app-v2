import validatePatchData from '../helpers/validatePatchData';
const testExpense = {
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
    expect(validatePatchData(testUser)).toEqual({
        type: 'User', correctDb: 'users', isValid: true,
    });
});
test('Returns {type: Expense, isValid: true}', () => {
    expect(validatePatchData(testExpense)).toEqual({
        type: 'Expense', correctDb: 'expenses', isValid: true,
    });
});
test('Returns {type: object, isValid: false}', () => {
    expect(validatePatchData(failTest)).toEqual({
        type: 'Unknown', correctDb: 'none', isValid: false,
    });
});
test('Returns {type: number, isValid: false}', () => {
    expect(validatePatchData({ something: 23131 })).toEqual({
        type: 'Unknown', correctDb: 'none', isValid: false,
    });
});
