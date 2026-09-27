'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var supertest = require('supertest');

var _require = require('../src/createServer'),
    createServer = _require.createServer;

describe('Expense', function () {
  var server;
  var api;
  beforeEach(function () {
    server = createServer();
    api = supertest(server);
  });
  describe('createExpense', function () {
    it('should create a new expense', function _callee() {
      var _ref, userId, expenseData, response;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref = _context.sent;
              userId = _ref.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData).expect(201).expect('Content-Type', /application\/json/));

            case 7:
              response = _context.sent;
              expect(response.body).toEqual(expect.objectContaining(_objectSpread({
                id: expect.any(Number)
              }, expenseData)));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('should return 400 if name is not provided', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(api.post('/expenses').send({}).expect(404));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it('should return 400 if user not found', function _callee3() {
      var expenseData;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expenseData = {
                userId: 1,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context3.next = 3;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData).expect(404));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
  describe('getExpenses', function () {
    it('should return empty array if no expenses', function _callee4() {
      var response;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(api.get('/expenses').expect(200).expect('Content-Type', /application\/json/));

            case 2:
              response = _context4.sent;
              expect(response.body).toEqual([]);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it('should return all expenses', function _callee5() {
      var _ref2, userId, expenseData, _ref3, expenseId, response;

      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref2 = _context5.sent;
              userId = _ref2.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context5.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref3 = _context5.sent;
              expenseId = _ref3.body.id;
              _context5.next = 11;
              return regeneratorRuntime.awrap(api.get('/expenses').expect(200).expect('Content-Type', /application\/json/));

            case 11:
              response = _context5.sent;
              expect(response.body).toEqual([_objectSpread({
                id: expenseId
              }, expenseData)]);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it('should return all expenses for a user', function _callee6() {
      var _ref4, userId, _ref5, userId2, expenseData, _ref6, expenseId, response;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref4 = _context6.sent;
              userId = _ref4.body.id;
              _context6.next = 6;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 6:
              _ref5 = _context6.sent;
              userId2 = _ref5.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context6.next = 11;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 11:
              _ref6 = _context6.sent;
              expenseId = _ref6.body.id;
              _context6.next = 15;
              return regeneratorRuntime.awrap(api.post('/expenses').send(_objectSpread({}, expenseData, {
                userId: userId2
              })));

            case 15:
              _context6.next = 17;
              return regeneratorRuntime.awrap(api.get("/expenses?userId=".concat(userId)).expect(200).expect('Content-Type', /application\/json/));

            case 17:
              response = _context6.sent;
              expect(response.body).toEqual([_objectSpread({
                id: expenseId
              }, expenseData)]);

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it('should return all expenses between dates', function _callee7() {
      var _ref7, userId, expenseData, _ref8, expenseId, response;

      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref7 = _context7.sent;
              userId = _ref7.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context7.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref8 = _context7.sent;
              expenseId = _ref8.body.id;
              _context7.next = 11;
              return regeneratorRuntime.awrap(api.post('/expenses').send(_objectSpread({}, expenseData, {
                spentAt: '2022-10-20T11:01:43.462Z'
              })));

            case 11:
              _context7.next = 13;
              return regeneratorRuntime.awrap(api // eslint-disable-next-line max-len
              .get("/expenses?&from=2022-10-19T00:00:00.000Z&to=2022-10-19T23:59:59.999Z").expect(200).expect('Content-Type', /application\/json/));

            case 13:
              response = _context7.sent;
              expect(response.body).toEqual([_objectSpread({
                id: expenseId
              }, expenseData)]);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it('should return all expenses by category', function _callee8() {
      var _ref9, userId, expenseData, _ref10, expenseId, response;

      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref9 = _context8.sent;
              userId = _ref9.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context8.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref10 = _context8.sent;
              expenseId = _ref10.body.id;
              _context8.next = 11;
              return regeneratorRuntime.awrap(api.post('/expenses').send(_objectSpread({}, expenseData, {
                category: 'Food'
              })));

            case 11:
              _context8.next = 13;
              return regeneratorRuntime.awrap(api.get("/expenses?userId=".concat(userId, "&categories=Electronics")).expect(200).expect('Content-Type', /application\/json/));

            case 13:
              response = _context8.sent;
              expect(response.body).toEqual([_objectSpread({
                id: expenseId
              }, expenseData)]);

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
  });
  describe('getExpense', function () {
    it('should return expense', function _callee9() {
      var _ref11, userId, expenseData, _ref12, expenseId, response;

      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref11 = _context9.sent;
              userId = _ref11.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context9.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref12 = _context9.sent;
              expenseId = _ref12.body.id;
              _context9.next = 11;
              return regeneratorRuntime.awrap(api.get("/expenses/".concat(expenseId)).expect(200).expect('Content-Type', /application\/json/));

            case 11:
              response = _context9.sent;
              expect(response.body).toEqual(_objectSpread({
                id: expenseId
              }, expenseData));

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should return 404 if expense not found', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(api.get('/expenses/1').expect(404));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
  });
  describe('updateExpense', function () {
    it('should update expense', function _callee11() {
      var _ref13, userId, expenseData, _ref14, expenseId, response;

      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref13 = _context11.sent;
              userId = _ref13.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context11.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref14 = _context11.sent;
              expenseId = _ref14.body.id;
              _context11.next = 11;
              return regeneratorRuntime.awrap(api.patch("/expenses/".concat(expenseId)).send({
                title: 'Buy a new TV'
              }).expect(200).expect('Content-Type', /application\/json/));

            case 11:
              response = _context11.sent;
              expect(response.body).toEqual(_objectSpread({
                id: expenseId
              }, expenseData, {
                title: 'Buy a new TV'
              }));

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it('should return 404 if expense not found', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(api.patch('/expenses/1').send({}).expect(404));

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
  });
  describe('deleteExpense', function () {
    it('should delete expense', function _callee13() {
      var _ref15, userId, expenseData, _ref16, expenseId;

      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(api.post('/users').send({
                name: 'John Doe'
              }));

            case 2:
              _ref15 = _context13.sent;
              userId = _ref15.body.id;
              expenseData = {
                userId: userId,
                spentAt: '2022-10-19T11:01:43.462Z',
                title: 'Buy a new laptop',
                amount: 999,
                category: 'Electronics',
                note: 'I need a new laptop'
              };
              _context13.next = 7;
              return regeneratorRuntime.awrap(api.post('/expenses').send(expenseData));

            case 7:
              _ref16 = _context13.sent;
              expenseId = _ref16.body.id;
              _context13.next = 11;
              return regeneratorRuntime.awrap(api["delete"]("/expenses/".concat(expenseId)).expect(204));

            case 11:
              _context13.next = 13;
              return regeneratorRuntime.awrap(api.get("/expenses/".concat(expenseId)).expect(404));

            case 13:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
    it('should return 404 if expense not found', function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(api["delete"]('/expenses/1').expect(404));

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      });
    });
  });
});