import getExpenseByQuery from '../helpers/getExpenseByQuery';

const testExpenses = [
  {
    id: '3fasdfa2324',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-01T09:20:00.000Z',
    title: 'Groceries',
    amount: 50,
    category: 'Food',
    note: 'Bought some groceries for the week',
  },
  {
    id: '5f9sdfsd1',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-01T12:00:00.000Z',
    title: 'Lunch',
    amount: 15,
    category: 'Food',
    note: 'Ate at a nearby restaurant',
  },
  {
    id: 'gsdfgdfg3',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-02T18:30:00.000Z',
    title: 'Movie tickets',
    amount: 25,
    category: 'Entertainment',
    note: 'Watched a movie with friends',
  },
  {
    id: 'adfgadfg4',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-02T20:00:00.000Z',
    title: 'Dinner',
    amount: 30,
    category: 'Food',
    note: 'Had dinner at a fancy restaurant',
  },
  {
    id: '9sdfg34234',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-03T13:00:00.000Z',
    title: 'Gas',
    amount: 40,
    category: 'Transportation',
    note: 'Filled up the car with gas',
  },
  {
    id: '3fadsf3243',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-03T17:00:00.000Z',
    title: 'Gym membership',
    amount: 60,
    category: 'Fitness',
    note: 'Paid for monthly gym membership',
  },
  {
    id: 'adfg4y54t4',
    userId: 'fdasf543dfs',
    spentAt: '2023-04-04T10:30:00.000Z',
    title: 'Coffee',
    amount: 5,
    category: 'Food',
    note: 'Bought a cup of coffee on the way to work',
  },
];

const testQueryBetweenDates = {
  from: '2023-04-01T09:20:00.000Z',
  to: '2023-04-02T20:00:00.000Z',
};

const testQueryCategory = {
  category: 'Food',
};

const testQueryFrom = {
  from: '2023-04-03T17:00:00.000Z',
};

const testQueryTo = {
  to: '2023-04-01T12:00:00.000Z',
};

test('Returns the first 4 objects', () => {
  expect(getExpenseByQuery(testExpenses, testQueryBetweenDates)).toEqual([
    {
      id: '3fasdfa2324',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T09:20:00.000Z',
      title: 'Groceries',
      amount: 50,
      category: 'Food',
      note: 'Bought some groceries for the week',
    },
    {
      id: '5f9sdfsd1',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T12:00:00.000Z',
      title: 'Lunch',
      amount: 15,
      category: 'Food',
      note: 'Ate at a nearby restaurant',
    },
    {
      id: 'gsdfgdfg3',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-02T18:30:00.000Z',
      title: 'Movie tickets',
      amount: 25,
      category: 'Entertainment',
      note: 'Watched a movie with friends',
    },
    {
      id: 'adfgadfg4',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-02T20:00:00.000Z',
      title: 'Dinner',
      amount: 30,
      category: 'Food',
      note: 'Had dinner at a fancy restaurant',
    },
  ]);
});

test('Returns only with category of Food', () => {
  expect(getExpenseByQuery(testExpenses, testQueryCategory)).toEqual([
    {
      id: '3fasdfa2324',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T09:20:00.000Z',
      title: 'Groceries',
      amount: 50,
      category: 'Food',
      note: 'Bought some groceries for the week',
    },
    {
      id: '5f9sdfsd1',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T12:00:00.000Z',
      title: 'Lunch',
      amount: 15,
      category: 'Food',
      note: 'Ate at a nearby restaurant',
    },
    {
      id: 'adfgadfg4',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-02T20:00:00.000Z',
      title: 'Dinner',
      amount: 30,
      category: 'Food',
      note: 'Had dinner at a fancy restaurant',
    },
    {
      id: 'adfg4y54t4',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-04T10:30:00.000Z',
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      note: 'Bought a cup of coffee on the way to work',
    },
  ]);
});

test('Returns last 2 elements', () => {
  expect(getExpenseByQuery(testExpenses, testQueryFrom)).toEqual([
    {
      id: '3fadsf3243',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-03T17:00:00.000Z',
      title: 'Gym membership',
      amount: 60,
      category: 'Fitness',
      note: 'Paid for monthly gym membership',
    },
    {
      id: 'adfg4y54t4',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-04T10:30:00.000Z',
      title: 'Coffee',
      amount: 5,
      category: 'Food',
      note: 'Bought a cup of coffee on the way to work',
    },
  ]);
});

test('Returns first 2 elements', () => {
  expect(getExpenseByQuery(testExpenses, testQueryTo)).toEqual([
    {
      id: '3fasdfa2324',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T09:20:00.000Z',
      title: 'Groceries',
      amount: 50,
      category: 'Food',
      note: 'Bought some groceries for the week',
    },
    {
      id: '5f9sdfsd1',
      userId: 'fdasf543dfs',
      spentAt: '2023-04-01T12:00:00.000Z',
      title: 'Lunch',
      amount: 15,
      category: 'Food',
      note: 'Ate at a nearby restaurant',
    },
  ]);
});

test('Returns all', () => {
  expect(getExpenseByQuery(testExpenses, {})).toEqual(testExpenses);
});

test('Returns empty array', () => {
  expect(getExpenseByQuery([], testQueryCategory)).toEqual([]);

  expect(getExpenseByQuery(testExpenses, {
    category: 'Not Exisiting Category',
  })).toEqual([]);

  expect(getExpenseByQuery(testExpenses, {
    from: '2024-04-02T11:46:08.681Z',
  })).toEqual([]);
});
